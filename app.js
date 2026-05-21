
function updateOutput(){
  const desired = Number(document.getElementById('desired').value);
  const inc = Number(document.getElementById('inc').value);

  const output = `Maksimalafbryder:
NSX250B 3P

Schneider Electric / ComPacT NSX
Relæ: MicroLogic 2.2 250A
Setting method: Calculated settings

Indstilling:
Io: 40A - 100A - 250A
Ir: 0.9 - 0.9 - 1 : 0.9xIo = ${desired}A
tr: 0.5s - 0.5s - 24s : 0.5s
Isd: 1.5 - 1.5 - 10 : 1.5xIr = 135A
Ii: 15 - 15 - 15 : 15xIn = 3750A
INC: ${inc}A`;

  document.getElementById('output').textContent = output;
}

updateOutput();
