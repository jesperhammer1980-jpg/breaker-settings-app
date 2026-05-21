const DB = [
  {
    brand: "Schneider Electric",
    series: "ComPacT NSX",
    breaker: "NSX250B 3P",
    frame: "NSX250",
    relay: "MicroLogic 2.2 250A",
    image: "assets/schneider-nsx.svg",
    poles: "3P",
    icu: 25,
    in: 250,
    status: "Mostly verified",
    statusClass: "ok",
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
    ],
    moduleWarning: "Avancerede kommunikations-/alarmfunktioner kan kræve ekstra modul eller serviceinterface."
  },
  {
    brand: "Schneider Electric",
    series: "ComPacT NS",
    breaker: "NS800N 4P",
    frame: "NS800",
    relay: "MicroLogic 5.0 800A",
    image: "assets/schneider-ns.svg",
    poles: "4P",
    icu: 50,
    in: 800,
    status: "Mostly verified",
    statusClass: "ok",
    ioOptions: [320, 400, 500, 630, 800],
    irFactors: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
    trOptions: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
    isdFactors: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
    iiFactors: [2, 3, 4, 6, 8, 10, 12, 15],
    neutralOptions: ["Off", "0.5 x Ir", "1 x Ir"],
    plugs: [
      { id: "standard", name: "Standard plug", typeNo: "Katalognr. kontrolleres", ioOptions: [320, 400, 500, 630, 800] },
      { id: "low", name: "Low setting plug", typeNo: "Katalognr. kontrolleres", ioOptions: [250, 320, 400, 500, 630] },
      { id: "high", name: "High setting plug", typeNo: "Katalognr. kontrolleres", ioOptions: [500, 630, 800] }
    ],
    docs: [
      ["ComPacT NS MicroLogic guide EN", "https://www.se.com/ww/en/download/document/DOCA0217EN/"],
      ["ComPacT NS download-center", "https://www.se.com/ww/en/download/"]
    ],
    moduleWarning: "På nogle NS MicroLogic relæer kræver ændring/adgang til avancerede settings et ekstra settings-/kommunikationsmodul eller serviceinterface."
  },
  {
    brand: "Schneider Electric",
    series: "MasterPact MTZ",
    breaker: "MTZ1 10 H2 4P",
    frame: "MTZ1",
    relay: "MicroLogic X 1000A",
    image: "assets/schneider-mtz.svg",
    poles: "4P",
    icu: 50,
    in: 1000,
    status: "Partly verified",
    statusClass: "partial",
    ioOptions: [400, 500, 630, 800, 1000],
    irFactors: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
    trOptions: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
    isdFactors: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
    iiFactors: [2, 3, 4, 6, 8, 10, 12, 15],
    plugs: [
      { id: "standard", name: "Standard plug", typeNo: "Katalognr. kontrolleres", ioOptions: [400, 500, 630, 800, 1000] },
      { id: "low", name: "Low setting plug", typeNo: "Katalognr. kontrolleres", ioOptions: [250, 400, 500, 630] }
    ],
    docs: [
      ["MTZ MicroLogic X guide EN", "https://www.se.com/ww/en/download/document/DOCA0102EN/"],
      ["Schneider download-center", "https://www.se.com/ww/en/download/"]
    ],
    moduleWarning: "MTZ MicroLogic X funktioner kan afhænge af VPS, ekstern 24V, kommunikationsinterface eller digitale moduler."
  },
  {
    brand: "ABB",
    series: "Tmax XT",
    breaker: "XT1B 3P",
    frame: "XT1",
    relay: "Relædata skal verificeres",
    image: "assets/abb-tmax.svg",
    poles: "3P",
    icu: 18,
    in: 100,
    status: "Draft",
    statusClass: "draft",
    ioOptions: [40, 63, 100],
    irFactors: [0.4, 0.7, 1],
    trOptions: [0.5, 1, 2, 4, 8],
    isdFactors: [],
    iiFactors: [],
    plugs: [{ id: "standard", name: "Standard", typeNo: "Katalognr. mangler", ioOptions: [40, 63, 100] }],
    docs: [["ABB circuit breakers", "https://new.abb.com/low-voltage/products/circuit-breakers"]],
    moduleWarning: "ABB-data er første struktur og skal verificeres mod katalog."
  },
  {
    brand: "Siemens",
    series: "3VA",
    breaker: "3VA 250 3P",
    frame: "3VA",
    relay: "ETU data skal verificeres",
    image: "assets/siemens-3va.svg",
    poles: "3P",
    icu: 55,
    in: 250,
    status: "Draft",
    statusClass: "draft",
    ioOptions: [100, 160, 250],
    irFactors: [0.4, 0.7, 1],
    trOptions: [0.5, 1, 2, 4, 8],
    isdFactors: [],
    iiFactors: [],
    plugs: [{ id: "standard", name: "Standard", typeNo: "Katalognr. mangler", ioOptions: [100, 160, 250] }],
    docs: [["Siemens support/download", "https://support.industry.siemens.com/"]],
    moduleWarning: "Siemens-data er første struktur og skal verificeres mod katalog."
  }
];

let state = {
  brand: "Schneider Electric",
  series: "ComPacT NSX",
  breakerIndex: 0,
  plugId: "standard",
  desired: 90,
  inc: 250,
  ikMin: 3.1,
  ikMax: 14,
  method: "Calculated settings"
};

const $ = (id) => document.getElementById(id);

function fmtA(v){ return `${Math.round(Number(v))}A`; }
function fmt(v){ return String(v).replace(/\.0$/,""); }

function bestSetting(ioOptions, irFactors, desired){
  let best = null;
  for(const io of ioOptions){
    for(const ir of irFactors){
      const value = io * ir;
      const diff = Math.abs(value - desired);
      const score = diff * 10000 + io; // tie breaker: lowest Io, e.g. 90A => Io100 + Ir0.9
      if(!best || score < best.score) best = { io, ir, value, diff, score };
    }
  }
  return best;
}

function unique(list){ return [...new Set(list)]; }

function currentRows(){
  return DB.filter(x => x.brand === state.brand && x.series === state.series);
}

function currentBreaker(){
  return DB[state.breakerIndex] || DB[0];
}

function activePlugData(b){
  const plugs = b.plugs.map(p => ({ ...p, best: bestSetting(p.ioOptions, b.irFactors, Number(state.desired)) }));
  return plugs.find(p => p.id === state.plugId) || plugs[0];
}

function rangeHtml(values, selected, formatter){
  if(!values || !values.length) return "Ikke relevant";
  return `${formatter(values[0])} - <u>${formatter(selected)}</u> - ${formatter(values[values.length - 1])}`;
}

function buildOutput(b, plug, calc, tr, isdFactor, isdValue, iiFactor, iiValue){
  const isdLine = isdFactor
    ? `${b.isdFactors[0]} - ${isdFactor} - ${b.isdFactors[b.isdFactors.length - 1]} : ${isdFactor}xIr = ${fmtA(isdValue)}`
    : "Ikke relevant / ikke fundet";
  const iiLine = iiFactor
    ? `${b.iiFactors[0]} - ${iiFactor} - ${b.iiFactors[b.iiFactors.length - 1]} : ${iiFactor}xIn = ${fmtA(iiValue)}`
    : "Ikke relevant";
  return `Maksimalafbryder:
${b.breaker}

${b.brand} / ${b.series}
Relæ: ${b.relay}
Setting method: ${state.method}
Rating plug: ${plug.name} / ${plug.typeNo}

Indstilling:
Io: ${fmtA(plug.ioOptions[0])} - ${fmtA(calc.io)} - ${fmtA(plug.ioOptions[plug.ioOptions.length - 1])}
Ir: ${fmt(b.irFactors[0])} - ${fmt(calc.ir)} - ${fmt(b.irFactors[b.irFactors.length - 1])} : ${fmt(calc.ir)}xIo = ${fmtA(calc.value)}
tr: ${b.trOptions[0]}s - ${tr}s - ${b.trOptions[b.trOptions.length - 1]}s : ${tr}s
Isd: ${isdLine}
Ii: ${iiLine}
INC: ${fmtA(state.inc)}`;
}

function fillSelect(el, values, selected){
  el.innerHTML = values.map(v => `<option value="${v}" ${v === selected ? "selected" : ""}>${v}</option>`).join("");
}

function renderSelectors(){
  const brands = unique(DB.map(x => x.brand));
  fillSelect($("brandSelect"), brands, state.brand);
  const series = unique(DB.filter(x => x.brand === state.brand).map(x => x.series));
  if(!series.includes(state.series)) state.series = series[0];
  fillSelect($("seriesSelect"), series, state.series);

  const rows = currentRows();
  if(!rows.includes(DB[state.breakerIndex])) state.breakerIndex = DB.indexOf(rows[0]);
  $("breakerSelect").innerHTML = rows.map(x => {
    const idx = DB.indexOf(x);
    return `<option value="${idx}" ${idx === state.breakerIndex ? "selected" : ""}>${x.breaker}</option>`;
  }).join("");

  $("relaySelect").innerHTML = `<option>${currentBreaker().relay}</option>`;
}

function render(){
  renderSelectors();
  const b = currentBreaker();
  const plug = activePlugData(b);
  const calc = plug.best;
  const tr = b.trOptions[0];
  const isdFactor = b.isdFactors?.[0] ?? null;
  const isdValue = isdFactor ? calc.value * isdFactor : null;
  const iiFactor = b.iiFactors?.[0] ?? null;
  const iiValue = iiFactor ? b.in * iiFactor : null;

  $("desiredInput").value = state.desired;
  $("ikMinInput").value = state.ikMin;
  $("ikMaxInput").value = state.ikMax;
  $("incInput").value = state.inc;
  $("methodSelect").value = state.method;

  $("deviceImage").src = b.image;
  $("verifyBadge").textContent = b.status;
  $("verifyBadge").className = `badge ${b.statusClass}`;
  $("deviceTitle").textContent = `${b.brand} · ${b.series}`;
  $("deviceSubtitle").textContent = `${b.breaker} · ${b.relay}`;
  $("chipFrame").textContent = `Frame: ${b.frame}`;
  $("chipIcu").textContent = `Icu: ${b.icu} kA`;
  $("chipPoles").textContent = `Poler: ${b.poles}`;

  $("ikWarning").classList.toggle("hidden", Number(state.ikMax) <= b.icu);

  $("settingsRows").innerHTML = `
    <tr><td>Io</td><td>${rangeHtml(plug.ioOptions, calc.io, fmtA)}</td><td>${fmtA(calc.io)}</td></tr>
    <tr><td>Ir</td><td>${rangeHtml(b.irFactors, calc.ir, fmt)}</td><td>${fmt(calc.ir)}xIo = ${fmtA(calc.value)}</td></tr>
    <tr><td>tr</td><td>${rangeHtml(b.trOptions, tr, v => v + "s")}</td><td>${tr}s</td></tr>
    <tr><td>Isd</td><td>${isdFactor ? rangeHtml(b.isdFactors, isdFactor, fmt) : "Ikke relevant"}</td><td>${isdFactor ? `${isdFactor}xIr = ${fmtA(isdValue)}` : "Ikke relevant / ikke fundet"}</td></tr>
    <tr><td>Ii</td><td>${iiFactor ? rangeHtml(b.iiFactors, iiFactor, fmt) : "Ikke relevant"}</td><td>${iiFactor ? `${iiFactor}xIn = ${fmtA(iiValue)}` : "Ikke relevant"}</td></tr>
    <tr><td>INC</td><td>Manuel værdi</td><td>${fmtA(state.inc)}</td></tr>
  `;

  const plugOptions = b.plugs.map(p => ({ ...p, best: bestSetting(p.ioOptions, b.irFactors, Number(state.desired)) }));
  $("plugPanel").innerHTML = plugOptions.map(p => `
    <button class="${p.id === plug.id ? "active" : ""}" data-plug="${p.id}">
      <strong>${p.name}</strong>
      <span>${p.typeNo}</span>
      <small>Io: ${fmtA(p.ioOptions[0])} - ${fmtA(p.best.io)} - ${fmtA(p.ioOptions[p.ioOptions.length - 1])}</small>
      <small>Ir: ${fmt(p.best.ir)}xIo = ${fmtA(p.best.value)}</small>
    </button>
  `).join("");

  $("docLinks").innerHTML = b.docs.map(([name, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${name}<span>Åbn</span></a>`).join("");
  $("moduleWarning").textContent = b.moduleWarning || "";
  $("moduleWarning").classList.toggle("hidden", !b.moduleWarning);

  const output = buildOutput(b, plug, calc, tr, isdFactor, isdValue, iiFactor, iiValue);
  $("output").textContent = output;
}

function bindEvents(){
  $("brandSelect").addEventListener("change", e => {
    state.brand = e.target.value;
    const first = DB.find(x => x.brand === state.brand);
    state.series = first.series;
    state.breakerIndex = DB.indexOf(first);
    state.plugId = first.plugs[0].id;
    state.inc = first.in;
    render();
  });
  $("seriesSelect").addEventListener("change", e => {
    state.series = e.target.value;
    const first = DB.find(x => x.brand === state.brand && x.series === state.series);
    state.breakerIndex = DB.indexOf(first);
    state.plugId = first.plugs[0].id;
    state.inc = first.in;
    render();
  });
  $("breakerSelect").addEventListener("change", e => {
    state.breakerIndex = Number(e.target.value);
    const b = currentBreaker();
    state.plugId = b.plugs[0].id;
    state.inc = b.in;
    render();
  });
  $("desiredInput").addEventListener("input", e => { state.desired = Number(e.target.value || 0); render(); });
  $("ikMinInput").addEventListener("input", e => { state.ikMin = Number(e.target.value || 0); render(); });
  $("ikMaxInput").addEventListener("input", e => { state.ikMax = Number(e.target.value || 0); render(); });
  $("incInput").addEventListener("input", e => { state.inc = Number(e.target.value || 0); render(); });
  $("methodSelect").addEventListener("change", e => { state.method = e.target.value; render(); });
  $("plugPanel").addEventListener("click", e => {
    const btn = e.target.closest("button[data-plug]");
    if(!btn) return;
    state.plugId = btn.dataset.plug;
    render();
  });
  $("copyBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("output").textContent.trim());
    $("copyBtn").textContent = "Kopieret";
    setTimeout(() => $("copyBtn").textContent = "Kopiér", 1200);
  });
}

bindEvents();
render();
