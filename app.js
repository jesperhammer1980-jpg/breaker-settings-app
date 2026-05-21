const breakers = [
  {
    brand: "Schneider Electric",
    series: "ComPacT NSX",
    breaker: "NSX250B 3P",
    frame: "NSX250",
    relay: "MicroLogic 2.2 250A",
    image: "assets/breakers/nsx.svg",
    status: "Mostly verified",
    poles: "3P",
    icu: "25 kA",
    inValue: 250,
    ioOptions: [100, 160, 250],
    irFactors: [0.9, 0.93, 0.95, 0.98, 1],
    trOptions: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
    isdFactors: [1.5, 2, 3, 4, 5, 6, 8, 10],
    iiFactors: [15],
    plugs: [
      { id: "standard", name: "Standard plug", typeNo: "Katalognr. kontrolleres", ioOptions: [100, 160, 250] },
      { id: "low", name: "Low setting plug", typeNo: "Katalognr. kontrolleres", ioOptions: [40, 63, 100] },
      { id: "high", name: "High setting plug", typeNo: "Katalognr. kontrolleres", ioOptions: [160, 250] }
    ],
    docs: [
      ["ComPacT NSX katalog EN", "https://www.se.com/ww/en/download/document/LVPED221001EN/"],
      ["NSX MicroLogic guide EN", "https://www.se.com/ww/en/download/document/DOCA0188EN/"],
      ["Schneider download-center", "https://www.se.com/ww/en/download/"]
    ]
  },
  {
    brand: "ABB",
    series: "Tmax XT",
    breaker: "XT1B 3P",
    frame: "XT1",
    relay: "Relædata skal verificeres",
    image: "assets/breakers/abb.svg",
    status: "Draft",
    poles: "3P",
    icu: "18 kA",
    inValue: 100,
    ioOptions: [40, 63, 100],
    irFactors: [0.4, 0.7, 1],
    trOptions: [0.5, 1, 2, 4, 8],
    isdFactors: [],
    iiFactors: [],
    plugs: [{ id: "standard", name: "Standard", typeNo: "Katalognr. mangler", ioOptions: [40, 63, 100] }],
    docs: [["ABB Tmax XT", "https://new.abb.com/low-voltage/products/circuit-breakers/moulded-case-circuit-breakers/tmax-xt"]]
  },
  {
    brand: "Siemens",
    series: "3VA",
    breaker: "3VA 250 3P",
    frame: "3VA",
    relay: "ETU data skal verificeres",
    image: "assets/breakers/siemens.svg",
    status: "Draft",
    poles: "3P",
    icu: "55 kA",
    inValue: 250,
    ioOptions: [100, 160, 250],
    irFactors: [0.4, 0.7, 1],
    trOptions: [0.5, 1, 2, 4, 8],
    isdFactors: [],
    iiFactors: [],
    plugs: [{ id: "standard", name: "Standard", typeNo: "Katalognr. mangler", ioOptions: [100, 160, 250] }],
    docs: [["Siemens 3VA support", "https://support.industry.siemens.com/"]]
  }
];

const state = { breakerIndex: 0, plugId: "standard" };

const el = (id) => document.getElementById(id);
const fmtA = (v) => `${Math.round(Number(v))}A`;
const fmt = (v) => String(v).replace(/\.0$/, "");

function bestSetting(ioOptions, irFactors, desired) {
  let best = null;
  for (const io of ioOptions) {
    for (const ir of irFactors) {
      const value = io * ir;
      const diff = Math.abs(value - desired);
      const score = diff * 10000 + io;
      if (!best || score < best.score) best = { io, ir, value, diff, score };
    }
  }
  return best;
}

function minMidMax(values, selected, formatter) {
  if (!values || values.length === 0) return "Ikke relevant";
  return `${formatter(values[0])} - <u>${formatter(selected)}</u> - ${formatter(values[values.length - 1])}`;
}

function plainMinMidMax(values, selected, formatter) {
  if (!values || values.length === 0) return "Ikke relevant";
  return `${formatter(values[0])} - ${formatter(selected)} - ${formatter(values[values.length - 1])}`;
}

function init() {
  const brandSelect = el("brandSelect");
  brandSelect.innerHTML = [...new Set(breakers.map(b => b.brand))].map(v => `<option>${v}</option>`).join("");
  brandSelect.addEventListener("change", () => {
    const index = breakers.findIndex(b => b.brand === brandSelect.value);
    selectBreaker(index);
  });

  ["seriesSelect", "breakerSelect", "relaySelect", "desiredCurrent", "ikMin", "ikMax", "inc", "method"].forEach(id => {
    el(id).addEventListener("input", render);
    el(id).addEventListener("change", render);
  });

  el("copyBtn").addEventListener("click", copyOutput);
  selectBreaker(0);
}

function selectBreaker(index) {
  state.breakerIndex = index;
  const b = breakers[index];
  state.plugId = b.plugs[0].id;
  el("brandSelect").value = b.brand;
  el("seriesSelect").innerHTML = `<option>${b.series}</option>`;
  el("breakerSelect").innerHTML = `<option>${b.breaker}</option>`;
  el("relaySelect").innerHTML = `<option>${b.relay}</option>`;
  el("desiredCurrent").value = b.brand === "Schneider Electric" ? 90 : Math.round(b.inValue * 0.7);
  el("inc").value = b.inValue;
  render();
}

function currentData() {
  const b = breakers[state.breakerIndex];
  const desired = Number(el("desiredCurrent").value);
  const plugs = b.plugs.map(p => ({ ...p, best: bestSetting(p.ioOptions, b.irFactors, desired) }));
  const plug = plugs.find(p => p.id === state.plugId) || plugs[0];
  const calc = plug.best;
  const tr = b.trOptions[0];
  const isdFactor = b.isdFactors[0] || null;
  const isdValue = isdFactor ? calc.value * isdFactor : null;
  const iiFactor = b.iiFactors[0] || null;
  const iiValue = iiFactor ? b.inValue * iiFactor : null;
  return { b, plugs, plug, calc, tr, isdFactor, isdValue, iiFactor, iiValue };
}

function render() {
  const { b, plugs, plug, calc, tr, isdFactor, isdValue, iiFactor, iiValue } = currentData();
  el("deviceImage").src = b.image;
  el("deviceTitle").textContent = `${b.brand} · ${b.series}`;
  el("deviceSub").textContent = `${b.breaker} · ${b.relay}`;
  el("chipFrame").textContent = `Frame: ${b.frame}`;
  el("chipIcu").textContent = `Icu: ${b.icu}`;
  el("chipPoles").textContent = `Poler: ${b.poles}`;
  el("statusBadge").textContent = b.status;
  el("statusBadge").className = b.status === "Draft" ? "badge draft" : "badge ok";

  const warningBox = el("warningBox");
  if (b.brand === "Schneider Electric") {
    warningBox.classList.remove("hidden");
    warningBox.textContent = "OBS: Rating plug typenummer og eventuelle high/low plugs skal kontrolleres mod den konkrete Schneider-konfiguration.";
  } else {
    warningBox.classList.remove("hidden");
    warningBox.textContent = "OBS: ABB/Siemens er foreløbig datastruktur og skal verificeres mod producentkatalog før brug.";
  }

  el("settingsRows").innerHTML = `
    <tr><td>Io</td><td>${minMidMax(plug.ioOptions, calc.io, fmtA)}</td><td>${fmtA(calc.io)}</td></tr>
    <tr><td>Ir</td><td>${minMidMax(b.irFactors, calc.ir, fmt)}</td><td>${fmt(calc.ir)}xIo = ${fmtA(calc.value)}</td></tr>
    <tr><td>tr</td><td>${minMidMax(b.trOptions, tr, v => `${v}s`)}</td><td>${tr}s</td></tr>
    <tr><td>Isd</td><td>${isdFactor ? minMidMax(b.isdFactors, isdFactor, fmt) : "Ikke relevant"}</td><td>${isdFactor ? `${isdFactor}xIr = ${fmtA(isdValue)}` : "Ikke relevant / ikke fundet"}</td></tr>
    <tr><td>Ii</td><td>${iiFactor ? minMidMax(b.iiFactors, iiFactor, fmt) : "Ikke relevant"}</td><td>${iiFactor ? `${iiFactor}xIn = ${fmtA(iiValue)}` : "Ikke relevant"}</td></tr>
    <tr><td>INC</td><td>Manuel værdi</td><td>${fmtA(el("inc").value)}</td></tr>
  `;

  el("plugPanel").innerHTML = plugs.map(p => `
    <button class="plug ${p.id === plug.id ? "active" : ""}" data-id="${p.id}">
      <strong>${p.name}</strong>
      <span>${p.typeNo}</span>
      <small>Io: ${fmtA(p.ioOptions[0])} - ${fmtA(p.best.io)} - ${fmtA(p.ioOptions[p.ioOptions.length - 1])}</small>
      <small>Ir: ${fmt(p.best.ir)}xIo = ${fmtA(p.best.value)}</small>
    </button>`).join("");
  document.querySelectorAll(".plug").forEach(btn => btn.addEventListener("click", () => { state.plugId = btn.dataset.id; render(); }));

  el("docs").innerHTML = b.docs.map(([name, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${name}<span>Åbn</span></a>`).join("");

  renderOutput();
}

function outputText(html = false) {
  const { b, plug, calc, tr, isdFactor, isdValue, iiFactor, iiValue } = currentData();
  const u1 = html ? "<u>" : "";
  const u2 = html ? "</u>" : "";
  return `Maksimalafbryder:\n${b.breaker}\n\n${b.brand} / ${b.series}\nRelæ: ${b.relay}\nSetting method: ${el("method").value}\nRating plug: ${plug.name} / ${plug.typeNo}\n\nIndstilling:\nIo: ${fmtA(plug.ioOptions[0])} - ${u1}${fmtA(calc.io)}${u2} - ${fmtA(plug.ioOptions[plug.ioOptions.length - 1])}\nIr: ${fmt(b.irFactors[0])} - ${u1}${fmt(calc.ir)}${u2} - ${fmt(b.irFactors[b.irFactors.length - 1])} : ${fmt(calc.ir)}xIo = ${fmtA(calc.value)}\ntr: ${b.trOptions[0]}s - ${u1}${tr}s${u2} - ${b.trOptions[b.trOptions.length - 1]}s : ${tr}s\nIsd: ${isdFactor ? `${plainMinMidMax(b.isdFactors, isdFactor, fmt)} : ${isdFactor}xIr = ${fmtA(isdValue)}` : "Ikke relevant / ikke fundet"}\nIi: ${iiFactor ? `${plainMinMidMax(b.iiFactors, iiFactor, fmt)} : ${iiFactor}xIn = ${fmtA(iiValue)}` : "Ikke relevant"}\nINC: ${fmtA(el("inc").value)}`;
}

function renderOutput() {
  el("output").innerHTML = outputText(true).replace(/\n/g, "<br>");
}

async function copyOutput() {
  await navigator.clipboard.writeText(outputText(false));
  el("copyNote").classList.remove("hidden");
  setTimeout(() => el("copyNote").classList.add("hidden"), 1400);
}

init();
