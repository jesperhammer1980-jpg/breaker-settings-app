const crypto = require("crypto");

const REDIS_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const PREFIX = "breaker-settings:test:stats:v1";
const DAY_MS = 24 * 60 * 60 * 1000;
const TOP_FIELDS = ["brand", "series", "frame", "relay", "rcd"];
const EVENT_TO_COUNTER = {
  visit: "visits",
  calculation: "calculations",
  documentation: "documentations",
};

const memory =
  globalThis.__breakerSettingsStatsMemory ||
  (globalThis.__breakerSettingsStatsMemory = {
    counters: new Map(),
    uniques: new Map(),
    tops: new Map(),
  });

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function dayKeys(count) {
  const keys = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    keys.push(todayKey(new Date(now.getTime() - i * DAY_MS)));
  }
  return keys;
}

function cleanText(value) {
  return String(value || "-")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 80) || "-";
}

function cleanRcd(value) {
  return String(value || "").toLowerCase() === "ja" ? "ja" : "nej";
}

function hashAnonymousId(value) {
  const text = cleanText(value);
  if (!text || text === "-") return "";
  return crypto
    .createHash("sha256")
    .update(`breaker-settings-anonymous-stats-v1|${text}`)
    .digest("hex");
}

function key(type, id) {
  return `${PREFIX}:${type}:${id}`;
}

function topKey(field, id) {
  return `${PREFIX}:top:${field}:${id}`;
}

function zeroCounters() {
  return { visits: 0, calculations: 0, documentations: 0 };
}

function normalizeCounters(input) {
  return {
    visits: Number(input.visits || 0),
    calculations: Number(input.calculations || 0),
    documentations: Number(input.documentations || 0),
  };
}

function addCounters(target, source) {
  target.visits += Number(source.visits || 0);
  target.calculations += Number(source.calculations || 0);
  target.documentations += Number(source.documentations || 0);
  return target;
}

function parseHash(result) {
  if (!result) return zeroCounters();
  if (Array.isArray(result)) {
    const out = {};
    for (let i = 0; i < result.length; i += 2) out[result[i]] = result[i + 1];
    return normalizeCounters(out);
  }
  return normalizeCounters(result);
}

function parseTop(result) {
  if (!Array.isArray(result)) return [];
  const rows = [];
  for (let i = 0; i < result.length; i += 2) {
    rows.push({ value: String(result[i]), count: Number(result[i + 1] || 0) });
  }
  return rows;
}

function mergeTop(target, rows) {
  rows.forEach((row) => {
    const value = cleanText(row.value);
    target.set(value, (target.get(value) || 0) + Number(row.count || 0));
  });
  return target;
}

function topArray(map) {
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, 5);
}

async function redis(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) throw new Error("Redis storage is not configured");
  const response = await fetch(`${REDIS_URL.replace(/\/$/, "")}/multi-exec`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!response.ok) {
    throw new Error(`Redis request failed with HTTP ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data)
    ? data.map((item) => (item && Object.hasOwn(item, "result") ? item.result : item))
    : [];
}

function memoryCounter(id) {
  if (!memory.counters.has(id)) memory.counters.set(id, zeroCounters());
  return memory.counters.get(id);
}

function memoryUnique(id) {
  if (!memory.uniques.has(id)) memory.uniques.set(id, new Set());
  return memory.uniques.get(id);
}

function memoryTop(id) {
  if (!memory.tops.has(id)) memory.tops.set(id, new Map());
  return memory.tops.get(id);
}

function storeMemoryEvent(counter, anonymousHash, selection) {
  const day = todayKey();
  [day, "total"].forEach((id) => {
    memoryCounter(id)[counter] += 1;
    if (anonymousHash) memoryUnique(id).add(anonymousHash);
    TOP_FIELDS.forEach((field) => {
      const value = field === "rcd" ? cleanRcd(selection[field]) : cleanText(selection[field]);
      const map = memoryTop(`${field}:${id}`);
      map.set(value, (map.get(value) || 0) + 1);
    });
  });
}

function readMemoryPeriod(id, days) {
  const counters = zeroCounters();
  const unique = new Set();
  const topMaps = Object.fromEntries(TOP_FIELDS.map((field) => [field, new Map()]));
  const keys = id === "total" ? ["total"] : dayKeys(days);
  keys.forEach((periodKey) => {
    addCounters(counters, memory.counters.get(periodKey) || zeroCounters());
    (memory.uniques.get(periodKey) || new Set()).forEach((item) => unique.add(item));
    TOP_FIELDS.forEach((field) => {
      mergeTop(topMaps[field], topArray(memory.tops.get(`${field}:${periodKey}`) || new Map()));
    });
  });
  return {
    counters,
    uniqueUsers: unique.size,
    top: Object.fromEntries(TOP_FIELDS.map((field) => [field, topArray(topMaps[field])])),
  };
}

async function storeRedisEvent(counter, anonymousHash, selection) {
  const day = todayKey();
  const commands = [
    ["HINCRBY", key("counters", day), counter, 1],
    ["HINCRBY", key("counters", "total"), counter, 1],
    ["EXPIRE", key("counters", day), 60 * 60 * 24 * 400],
  ];
  if (anonymousHash) {
    commands.push(
      ["PFADD", key("unique", day), anonymousHash],
      ["PFADD", key("unique", "total"), anonymousHash],
      ["EXPIRE", key("unique", day), 60 * 60 * 24 * 400],
    );
  }
  TOP_FIELDS.forEach((field) => {
    const value = field === "rcd" ? cleanRcd(selection[field]) : cleanText(selection[field]);
    commands.push(
      ["ZINCRBY", topKey(field, day), 1, value],
      ["ZINCRBY", topKey(field, "total"), 1, value],
      ["EXPIRE", topKey(field, day), 60 * 60 * 24 * 400],
    );
  });
  await redis(commands);
}

async function readRedisPeriod(id, days) {
  const keys = id === "total" ? ["total"] : dayKeys(days);
  const commands = [];
  keys.forEach((periodKey) => commands.push(["HGETALL", key("counters", periodKey)]));
  commands.push(["PFCOUNT", ...keys.map((periodKey) => key("unique", periodKey))]);
  TOP_FIELDS.forEach((field) => {
    keys.forEach((periodKey) =>
      commands.push(["ZREVRANGE", topKey(field, periodKey), 0, 20, "WITHSCORES"]),
    );
  });
  const results = await redis(commands);
  let index = 0;
  const counters = zeroCounters();
  keys.forEach(() => addCounters(counters, parseHash(results[index++])));
  const uniqueUsers = Number(results[index++] || 0);
  const top = {};
  TOP_FIELDS.forEach((field) => {
    const map = new Map();
    keys.forEach(() => mergeTop(map, parseTop(results[index++])));
    top[field] = topArray(map);
  });
  return { counters, uniqueUsers, top };
}

async function readStats() {
  const periods = [
    ["today", 1],
    ["last7", 7],
    ["last30", 30],
    ["total", null],
  ];
  if (REDIS_URL && REDIS_TOKEN) {
    const entries = await Promise.all(
      periods.map(async ([id, days]) => [id, await readRedisPeriod(id, days)]),
    );
    return { storage: "vercel-kv/upstash-redis", periods: Object.fromEntries(entries) };
  }
  return {
    storage: "memory-fallback",
    periods: Object.fromEntries(
      periods.map(([id, days]) => [id, readMemoryPeriod(id, days)]),
    ),
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4096) reject(new Error("Request body too large"));
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  try {
    if (req.method === "GET") {
      sendJson(res, 200, await readStats());
      return;
    }
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }
    const body = JSON.parse((await readBody(req)) || "{}");
    const counter = EVENT_TO_COUNTER[body.type];
    if (!counter) {
      sendJson(res, 400, { error: "Unknown stats event" });
      return;
    }
    const selection = body.selection || {};
    const sanitizedSelection = {
      brand: cleanText(selection.brand),
      series: cleanText(selection.series),
      frame: cleanText(selection.frame),
      relay: cleanText(selection.relay),
      rcd: cleanRcd(selection.rcd),
    };
    const anonymousHash = hashAnonymousId(body.anonymousId);
    if (REDIS_URL && REDIS_TOKEN) {
      await storeRedisEvent(counter, anonymousHash, sanitizedSelection);
    } else {
      storeMemoryEvent(counter, anonymousHash, sanitizedSelection);
    }
    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Stats error" });
  }
};
