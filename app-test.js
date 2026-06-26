const NOT_DOCUMENTED = "Ikke dokumenteret af producent";
const VERIFY = NOT_DOCUMENTED;
const stepValues = (start, end, step) => {
  const precision = (String(step).split(".")[1] || "").length + 2;
  const values = [];
  for (let v = start; v <= end + step / 2; v += step) {
    values.push(Number(v.toFixed(precision)));
  }
  return values;
};
const ratios = (inA, values) =>
  values.map((value) => Number((value / inA).toFixed(6)));
const keyed = (keys, values) =>
  Object.fromEntries(keys.map((key) => [key, values]));
const ampValues = (start, end) => {
  const values = [];
  for (let v = start; v <= end + 0.25; v += v < 50 ? 0.5 : 1) {
    values.push(Number(v.toFixed(3)));
  }
  return values;
};
const ampRatios = (inA, start, end) => ratios(inA, ampValues(start, end));
const ampRatiosStep = (inA, start, end, step = 1) =>
  ratios(inA, stepValues(start, end, step));
const settingsByRow = (rows, selector) =>
  Object.fromEntries(
    rows.map((row) => [`${row.frame}|${row.inA}`, selector(row)]),
  );
const SCHNEIDER_NSX_MICROLOGIC_IO = {
  40: ratios(40, [16, 18, 20, 23, 25, 28, 32, 36, 40]),
  100: ratios(100, [40, 45, 50, 63, 70, 80, 90, 100]),
  160: ratios(160, [63, 70, 80, 90, 100, 110, 125, 140, 160]),
  250: ratios(250, [100, 110, 125, 140, 160, 175, 200, 225, 250]),
  400: ratios(400, [160, 180, 200, 230, 250, 280, 320, 360, 400]),
  630: ratios(630, [250, 280, 320, 350, 400, 450, 500, 570, 630]),
};
const SCHNEIDER_NSX_MICROLOGIC_IR = [
  0.9, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 1,
];
const SCHNEIDER_NSXM_MICROLOGIC_41_IR = {
  25: ratios(25, [10, 11, 12, 14, 16, 18, 20, 22, 25]),
  50: ratios(50, [20, 22, 25, 28, 32, 36, 40, 45, 50]),
  100: ratios(100, [40, 45, 50, 56, 63, 70, 80, 90, 100]),
  160: ratios(160, [63, 70, 80, 90, 100, 115, 130, 145, 160]),
};
const SCHNEIDER_NSXM_MICROLOGIC_41_II = {
  25: "375A",
  50: "750A",
  100: "1500A",
  160: "2000A",
};
const SCHNEIDER_NSX_VIGI_SENS = {
  default: ["30 mA", "100 mA", "300 mA", "500 mA", "1 A", "3 A", "5 A", "OFF"],
  400: ["300 mA", "500 mA", "1 A", "3 A", "5 A", "10 A", "OFF"],
  630: ["300 mA", "500 mA", "1 A", "3 A", "5 A", "10 A", "OFF"],
};
const SCHNEIDER_NSX_VIGI_DELAY = ["0 ms", "60 ms", "150 ms", "500 ms", "1 s"];
const SCHNEIDER_NSX_VIGIPACT_SENS = [
  "30 mA",
  "100 mA",
  "300 mA",
  "500 mA",
  "1 A",
  "3 A",
  "10 A",
  "30 A",
];
const SCHNEIDER_NSX_VIGIPACT_DELAY = [
  "0 ms",
  "60 ms",
  "150 ms",
  "300 ms",
  "500 ms",
  "800 ms",
  "1,2 s",
  "4 s",
];
const SCHNEIDER_NSXM_RCD_SENS = ["30 mA", "100 mA", "300 mA", "500 mA", "1 A"];
const SCHNEIDER_NSXM_RCD_DELAY = ["0 ms", "60 ms", "150 ms", "500 ms", "1 s"];
const SCHNEIDER_MTZ_RCD_SENS = ["0,5 ... 30 A (0,1 A trin)"];
const SCHNEIDER_MTZ_RCD_DELAY = ["0,06 s", "0,15 s", "0,23 s", "0,35 s", "0,80 s"];

const ABB_DIP_L = [
  0.4, 0.42, 0.45, 0.47, 0.5, 0.52, 0.55, 0.57, 0.6, 0.62, 0.65, 0.67,
  0.7, 0.72, 0.75, 0.77, 0.8, 0.82, 0.85, 0.87, 0.9, 0.92, 0.95, 0.97,
  1,
];
const ABB_DIP_S_XT2_XT6 = [
  1, 1.5, 2, 2.5, 3, 3.5, 4.5, 5.5, 6.5, 7, 7.5, 8, 8.5, 9, 10,
];
const ABB_DIP_S_XT7_EMAX = [
  0.6, 0.8, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
];
const ABB_DIP_I_XT2_XT6 = [
  1, 1.5, 2, 2.5, 3, 3.5, 4.5, 5.5, 6.5, 7, 7.5, 8, 8.5, 9, 10,
];
const ABB_DIP_I_XT7_EMAX = [
  1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
];
const ABB_TOUCH_L = stepValues(0.4, 1, 0.001);
const ABB_TOUCH_S = stepValues(0.6, 10, 0.1);
const ABB_TOUCH_I_XT2_XT5 = stepValues(1.5, 10, 0.1);
const ABB_TOUCH_I_XT7_EMAX = stepValues(1.5, 15, 0.1);
const ABB_EMAX2_DIP_TR = [3, 12, 24, 36, 48, 72, 108, 144];
const ABB_RC_SENS = ["3 A", "5 A", "7 A", "10 A", "20 A", "30 A"];
const ABB_RC_DELAY = ["0,06 s", "0,1 s", "0,2 s", "0,3 s", "0,4 s", "0,5 s", "0,8 s"];
const ABB_XT_RC_INST_SENS = ["0,03 A", "0,1 A", "0,3 A", "0,5 A", "1 A", "3 A"];
const ABB_XT_RC_SEL_SENS = [
  "0,03 A",
  "0,05 A",
  "0,1 A",
  "0,3 A",
  "0,5 A",
  "1 A",
  "3 A",
  "5 A",
  "10 A",
];
const ABB_XT_RC_B_SENS = ["0,03 A", "0,05 A", "0,1 A", "0,3 A", "0,5 A", "1 A"];
const ABB_XT_RC_INST_DELAY = ["Instantaneous"];
const ABB_XT_RC_SEL_DELAY = [
  "Instantaneous",
  "0,1 s",
  "0,2 s",
  "0,3 s",
  "0,5 s",
  "1 s",
  "2 s",
  "3 s",
];
const ABB_XT_RC_B_DELAY = ["0 s", "0,1 s", "0,2 s", "0,3 s", "0,5 s", "1 s", "2 s", "3 s"];
const ABB_EMAX2_RC_SENS = ["3 ... 30 A"];
const ABB_EMAX2_RC_DELAY = ["0,05 ... 0,8 s"];

const SIEMENS_3VA2_ETU3_IR = {
  25: ratios(25, [10, 12, 14, 16, 18, 20, 22, 23, 24, 25]),
  40: ratios(40, [16, 20, 24, 28, 30, 32, 34, 36, 38, 40]),
  63: ratios(63, [25, 30, 35, 40, 45, 50, 54, 57, 60, 63]),
  100: ratios(100, [40, 50, 63, 70, 75, 80, 85, 90, 95, 100]),
  160: ratios(160, [63, 80, 95, 110, 125, 140, 145, 150, 155, 160]),
  250: ratios(250, [100, 125, 150, 175, 200, 210, 220, 230, 240, 250]),
  400: ratios(400, [160, 200, 240, 280, 300, 320, 340, 360, 380, 400]),
  630: ratios(630, [250, 315, 400, 450, 500, 525, 550, 575, 600, 630]),
  800: ratios(800, [320, 400, 500, 550, 600, 630, 680, 720, 760, 800]),
  1000: ratios(1000, [400, 500, 630, 700, 750, 800, 850, 900, 950, 1000]),
};
const SIEMENS_3VA2_ETU3_TR_DEFAULT = [0.5, 0.75, 1, 2, 3, 5, 8, 10, 14, 17];
const SIEMENS_3VA2_ETU3_DEFAULT_KEYS = [
  "3VA20 100|25",
  "3VA20 100|40",
  "3VA20 100|63",
  "3VA20 100|100",
  "3VA21 160|25",
  "3VA21 160|40",
  "3VA21 160|63",
  "3VA21 160|100",
  "3VA21 160|160",
  "3VA22 250|160",
  "3VA23 400|250",
  "3VA23 400|400",
  "3VA24 630|400",
  "3VA25 1000|630",
  "3VA25 1000|800",
  "3VA25 1000|1000",
];
const SIEMENS_3VA_NOT_DOCUMENTED_KEYS = [
  "3VA20 100|80",
  "3VA21 160|80",
  "3VA21 160|125",
  "3VA22 250|200",
  "3VA23 400|320",
  "3VA24 630|500",
  "3VA26 1250|1250",
];
const SIEMENS_3VA2_ETU320_II_DEFAULT_KEYS = [
  "3VA20 100|25",
  "3VA20 100|40",
  "3VA20 100|63",
  "3VA20 100|100",
  "3VA21 160|25",
  "3VA21 160|40",
  "3VA21 160|63",
  "3VA21 160|100",
  "3VA22 250|160",
  "3VA23 400|250",
  "3VA24 630|400",
  "3VA25 1000|630",
];
const SIEMENS_3VA27_ETU3_IR = [0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
const SIEMENS_3VA27_ETU3_TR = [0.75, 1, 2, 5, 8, 10, 14, 17, 21, 25];
const SIEMENS_3VA27_ETU3_ISD = [1, 1.5, 2, 2.5, 3, 4, 6, 8, 10];
const SIEMENS_3VA27_ETU3_II = [1.5, 2, 3, 4, 6, 8, 10, 12, 15];
const SIEMENS_3VA_ETU3_IR = {
  ...SIEMENS_3VA2_ETU3_IR,
  default: [NOT_DOCUMENTED],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_IR,
};
const SIEMENS_3VA_ETU3_TR = {
  default: [NOT_DOCUMENTED],
  ...keyed(SIEMENS_3VA2_ETU3_DEFAULT_KEYS, SIEMENS_3VA2_ETU3_TR_DEFAULT),
  "3VA22 250|250": [0.5, 0.75, 1, 2, 3, 5, 8, 10, 14, 15],
  "3VA24 630|630": [0.5, 0.75, 1, 2, 3, 5, 8, 10, 11, 12],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_TR,
};
const SIEMENS_3VA_ETU320_II = {
  default: [NOT_DOCUMENTED],
  ...keyed(SIEMENS_3VA2_ETU320_II_DEFAULT_KEYS, [
    1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12,
  ]),
  "3VA21 160|160": [1.5, 2, 2.5, 3, 4, 5, 6, 8, 9, 10],
  "3VA22 250|250": [1.5, 2, 2.5, 3, 4, 5, 6, 8, 9, 10],
  "3VA23 400|400": [1.5, 2, 2.5, 3, 4, 5, 6, 8, 9, 10],
  "3VA24 630|630": [1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9],
  "3VA25 1000|800": [1.5, 2, 2.5, 3, 4, 5, 6, 8, 9, 10],
  "3VA25 1000|1000": [1.5, 2, 2.5, 3, 4, 5, 6, 8, 9, 10],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_II,
};
const SIEMENS_3VA_ETU350_ISD = {
  default: [NOT_DOCUMENTED],
  ...keyed(SIEMENS_3VA2_ETU3_DEFAULT_KEYS, [
    1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10,
  ]),
  "3VA22 250|250": [1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10],
  "3VA24 630|630": [1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 9],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_ISD,
};
const SIEMENS_3VA_ETU350_II_FIXED = {
  "3VA20 100|25": "300A",
  "3VA20 100|40": "480A",
  "3VA20 100|63": "756A",
  "3VA20 100|100": "1200A",
  "3VA21 160|25": "300A",
  "3VA21 160|40": "480A",
  "3VA21 160|63": "756A",
  "3VA21 160|100": "1200A",
  "3VA21 160|160": "1600A",
  "3VA22 250|160": "1920A",
  "3VA22 250|250": "2500A",
  "3VA23 400|250": "3000A",
  "3VA23 400|400": "4000A",
  "3VA24 630|400": "4800A",
  "3VA24 630|630": "5670A",
  "3VA25 1000|630": "7560A",
  "3VA25 1000|800": "8000A",
  "3VA25 1000|1000": "10000A",
};
const SIEMENS_3VA_ETU350_II = {
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_II,
};
const SIEMENS_3VA_ETU850_RATINGS_BY_FRAME = {
  "3VA20 100": [25, 40, 63, 100],
  "3VA21 160": [25, 40, 63, 100, 160],
  "3VA22 250": [160, 250],
  "3VA23 400": [250, 400],
  "3VA24 630": [400, 500, 630],
  "3VA25 1000": [630, 800, 1000],
};
const SIEMENS_3VA_ETU850_ROWS = [
  {
    frame: "3VA20 100",
    inA: 25,
    ir: [10, 25],
    trMax: 25,
    isd: [15, 250],
    ii: [38, 300],
  },
  {
    frame: "3VA20 100",
    inA: 40,
    ir: [16, 40],
    trMax: 25,
    isd: [24, 400],
    ii: [60, 480],
  },
  {
    frame: "3VA20 100",
    inA: 63,
    ir: [25, 63],
    trMax: 25,
    isd: [38, 630],
    ii: [95, 756],
  },
  {
    frame: "3VA20 100",
    inA: 100,
    ir: [40, 100],
    trMax: 25,
    isd: [60, 1000],
    ii: [150, 1200],
  },
  {
    frame: "3VA21 160",
    inA: 25,
    ir: [10, 25],
    trMax: 25,
    isd: [15, 250],
    ii: [38, 300],
  },
  {
    frame: "3VA21 160",
    inA: 40,
    ir: [16, 40],
    trMax: 25,
    isd: [24, 400],
    ii: [60, 480],
  },
  {
    frame: "3VA21 160",
    inA: 63,
    ir: [25, 63],
    trMax: 25,
    isd: [38, 630],
    ii: [95, 756],
  },
  {
    frame: "3VA21 160",
    inA: 100,
    ir: [40, 100],
    trMax: 25,
    isd: [60, 1000],
    ii: [150, 1200],
  },
  {
    frame: "3VA21 160",
    inA: 160,
    ir: [63, 160],
    trMax: 20,
    isd: [96, 1600],
    ii: [240, 1600],
  },
  {
    frame: "3VA22 250",
    inA: 160,
    ir: [63, 160],
    trMax: 25,
    isd: [96, 1600],
    ii: [240, 1920],
  },
  {
    frame: "3VA22 250",
    inA: 250,
    ir: [100, 250],
    trMax: 15,
    isd: [150, 2500],
    ii: [375, 2500],
  },
  {
    frame: "3VA23 400",
    inA: 250,
    ir: [100, 250],
    trMax: 25,
    isd: [150, 2500],
    ii: [375, 3000],
  },
  {
    frame: "3VA23 400",
    inA: 400,
    ir: [160, 400],
    trMax: 17,
    isd: [240, 4000],
    ii: [600, 4000],
  },
  {
    frame: "3VA24 630",
    inA: 400,
    ir: [160, 400],
    trMax: 25,
    isd: [240, 4000],
    ii: [600, 6000],
  },
  {
    frame: "3VA24 630",
    inA: 500,
    ir: [200, 500],
    trMax: 20,
    isd: [300, 5000],
    ii: [750, 7000],
  },
  {
    frame: "3VA24 630",
    inA: 630,
    ir: [250, 630],
    trMax: 12,
    isd: [378, 5670],
    ii: [945, 5670],
  },
  {
    frame: "3VA25 1000",
    inA: 630,
    ir: [250, 630],
    trMax: 25,
    isd: [378, 6300],
    ii: [945, 7560],
  },
  {
    frame: "3VA25 1000",
    inA: 800,
    ir: [320, 800],
    trMax: 25,
    isd: [480, 8000],
    ii: [1200, 8000],
  },
  {
    frame: "3VA25 1000",
    inA: 1000,
    ir: [400, 1000],
    trMax: 25,
    isd: [600, 10000],
    ii: [1500, 12000],
  },
];
const SIEMENS_3VA_ETU850_IR = settingsByRow(
  SIEMENS_3VA_ETU850_ROWS,
  (row) => ampRatios(row.inA, row.ir[0], row.ir[1]),
);
const SIEMENS_3VA_ETU850_TR = settingsByRow(
  SIEMENS_3VA_ETU850_ROWS,
  (row) => stepValues(0.5, row.trMax, 0.1),
);
const SIEMENS_3VA_ETU850_ISD = settingsByRow(
  SIEMENS_3VA_ETU850_ROWS,
  (row) => ampRatios(row.inA, row.isd[0], row.isd[1]),
);
const SIEMENS_3VA_ETU850_II = settingsByRow(
  SIEMENS_3VA_ETU850_ROWS,
  (row) => ampRatiosStep(row.inA, row.ii[0], row.ii[1], 1),
);
const SIEMENS_3VA_ETU6_IR = stepValues(0.4, 1, 0.001);
const SIEMENS_3VA_ETU6_TR = stepValues(0.75, 36, 0.25);
const SIEMENS_3VA_ETU6_ISD = stepValues(0.6, 10, 0.1);
const SIEMENS_3VA_ETU6_II = stepValues(1.5, 15, 0.1);

const SIEMENS_3WL_ETU15_IR = [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 1];
const SIEMENS_3WL_ETU25_IR = [0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 0.9, 1];
const SIEMENS_3WL_ETU25_ISD = [1.25, 1.5, 2, 2.5, 3, 4, 6, 8, 10, 12];
const SIEMENS_3WL_ETU45_TR = [2, 3.5, 5.5, 8, 10, 14, 17, 21, 25, 30];
const SIEMENS_3WL_ETU45_II = [1.5, 2.2, 3, 4, 6, 8, 10, 12];
const SIEMENS_3WL_ETU25_II_FIXED = {
  630: "12600A",
  800: "16000A",
  1000: "20000A",
  1250: "25000A",
  1600: "32000A",
  2000: "40000A",
  2500: "50000A",
  3200: "50000A",
  4000: "50000A",
  5000: "50000A",
  6300: "50000A",
};
const SIEMENS_3VA_RCD820_SENS = ["0,03 ... 30 A (10 trin)"];
const SIEMENS_3VA_RCD820_TYPES = ["A (0,03-10 A)", "AC (30 A)"];
const SIEMENS_3VA_RCD820_DELAY = ["0 ... 10000 ms (10 trin)"];
const SIEMENS_3WA_ETU300_IR = [
  0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
];
const SIEMENS_3WA_ETU300_TR = [0.75, 1, 2, 5, 8, 10, 14, 17, 21, 25];
const SIEMENS_3WA_ETU300_ISD = [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
const SIEMENS_3WA_ETU300_II = [1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15];
const SIEMENS_3WA_ETU600_IR = [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
const SIEMENS_3WA_ETU600_TR = [1, 2, 5, 8, 10, 14, 17, 21, 25];
const SIEMENS_3WA_ETU600_ISD = [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
const SIEMENS_3WA_ETU600_II = [1.5, 2, 3, 4, 6, 8, 10, 12, 15];
const SIEMENS_3WA_RATINGS_BY_FRAME = {
  "3WA11 Size 1": [250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500],
  "3WA12 Size 2": [
    250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000,
  ],
  "3WA13 Size 3": [800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6300],
};

const DATA = [
  {
    brand: "Schneider Electric",
    series: "ComPacT NSX",
    image: "assets/schneider-nsx.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "NSX100",
        classes: [
          ["B", 25],
          ["F", 36],
          ["N", 50],
          ["H", 70],
          ["S", 100],
          ["L", 150],
          ["R", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [16, 25, 40, 63, 80, 100],
      },
      {
        frame: "NSX160",
        classes: [
          ["B", 25],
          ["F", 36],
          ["N", 50],
          ["H", 70],
          ["S", 100],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [40, 63, 80, 100, 125, 160],
      },
      {
        frame: "NSX250",
        classes: [
          ["B", 25],
          ["F", 36],
          ["N", 50],
          ["H", 70],
          ["S", 100],
          ["L", 150],
          ["R", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [100, 160, 200, 250],
      },
      {
        frame: "NSX400",
        classes: [
          ["F", 36],
          ["N", 50],
          ["H", 70],
          ["S", 100],
          ["L", 150],
          ["R", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [160, 250, 400],
      },
      {
        frame: "NSX630",
        classes: [
          ["F", 36],
          ["N", 50],
          ["H", 70],
          ["S", 100],
          ["L", 150],
          ["R", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [250, 400, 630],
      },
    ],
    relays: [
      {
        name: "TM-D",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [16, 25, 40, 63, 80, 100],
          NSX160: [40, 63, 80, 100, 125, 160],
          NSX250: [200, 250],
        },
        ir: [1],
        trFixed: "15s",
        imByRating: {
          16: "190A",
          25: "300A",
          40: "500A",
          63: "500A",
          80: "640A",
          100: "800A",
          125: "1250A",
          160: "1250A",
          200: "5-10xIn",
          250: "5-10xIn",
        },
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, TM-D thermal-magnetic trip unit tables for 3P/4P circuit breakers up to 63 A and from 80 A to 250 A: Ir, fixed tr and Ii/Im values verified.",
      },
      {
        name: "MicroLogic 2.2",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [40, 100, 160],
          NSX250: [40, 100, 160, 250],
        },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        iiByRating: { 40: "600A", 100: "1500A", 160: "2400A", 250: "3000A" },
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 2 electronic trip unit setting tables: Io/Ir, tr, Isd and fixed Ii values verified for 2.2 and 2.3 ratings.",
      },
      {
        name: "MicroLogic Vigi 4.2",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [100],
          NSX160: [100, 160],
          NSX250: [100, 160, 250],
        },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        trFixed: "16s ved 6 x Ir (ikke indstillelig)",
        isd: ["1,5 ... 10 x Ir"],
        iiByRating: { 100: "1500A", 160: "2400A", 250: "3000A" },
        residualCurrent: {
          kind: "integrated",
          device: "MicroLogic Vigi 4.2",
          sensitivities: SCHNEIDER_NSX_VIGI_SENS,
          types: ["A"],
          delays: SCHNEIDER_NSX_VIGI_DELAY,
          sourceNote:
            "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 4 earth-leakage settings: I\\u0394n pickup values by rating and time-delay values verified.",
        },
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 4 electronic trip units: Io/Ir, fixed tr, Isd range and fixed Ii values verified. Schneider Electric ComPacT NSX MicroLogic 5/6/7 User Guide DOCA0188EN-03 identifies MicroLogic Vigi 4.2 as NSX100/160/250 distribution trip unit.",
      },
      {
        name: "MicroLogic 5.2 E",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [40, 100, 160],
          NSX250: [40, 100, 160, 250],
        },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12, 15],
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03, Long-Time, Short-Time and Instantaneous protection setting tables: Io/Ir, tr, Isd and Ii values verified.",
      },
      {
        name: "MicroLogic 6.2 E",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [40, 100, 160],
          NSX250: [40, 100, 160, 250],
        },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12, 15],
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03, Long-Time, Short-Time and Instantaneous protection setting tables: Io/Ir, tr, Isd and Ii values verified.",
      },
      {
        name: "MicroLogic Vigi 7.2 E-AL",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [100],
          NSX160: [100, 160],
          NSX250: [100, 160, 250],
        },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12, 15],
        residualCurrent: {
          kind: "integrated",
          device: "MicroLogic Vigi 7.2 E-AL",
          sensitivities: SCHNEIDER_NSX_VIGI_SENS,
          types: ["A"],
          delays: SCHNEIDER_NSX_VIGI_DELAY,
          sourceNote:
            "Schneider Electric ComPacT NSX MicroLogic 5/6/7 User Guide DOCA0188EN-03, MicroLogic 7 earth-leakage settings: I\\u0394n pickup values by rating and time-delay values verified.",
        },
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03/DOCA0188EN-03, distribution MicroLogic Vigi 7.2 E-AL and protection setting tables: Io/Ir, tr, Isd and Ii verified.",
      },
      {
        name: "MicroLogic 2.3",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [250, 400], NSX630: [250, 400, 630] },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        iiByRating: { 250: "3000A", 400: "4800A", 630: "6930A" },
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 2 electronic trip unit setting tables and instantaneous protection pickup Ii table: Io/Ir, tr, Isd and fixed Ii values verified for 2.2 and 2.3 ratings, including Ii 3000A for In 250A, 4800A for In 400A and 6930A for In 630A.",
      },
      {
        name: "MicroLogic Vigi 4.3",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        trFixed: "16s ved 6 x Ir (ikke indstillelig)",
        isd: ["1,5 ... 10 x Ir"],
        iiByRating: { 400: "4800A", 630: "6930A" },
        residualCurrent: {
          kind: "integrated",
          device: "MicroLogic Vigi 4.3",
          sensitivities: SCHNEIDER_NSX_VIGI_SENS,
          types: ["A"],
          delays: SCHNEIDER_NSX_VIGI_DELAY,
          sourceNote:
            "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 4 earth-leakage settings: I\\u0394n pickup values by rating and time-delay values verified.",
        },
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, MicroLogic 4 electronic trip units: Io/Ir, fixed tr, Isd range and fixed Ii values verified. Schneider Electric ComPacT NSX MicroLogic 5/6/7 User Guide DOCA0188EN-03 identifies MicroLogic Vigi 4.3 as NSX400/630 distribution trip unit.",
      },
      {
        name: "MicroLogic 5.3 E",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12],
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03, Long-Time, Short-Time and Instantaneous protection setting tables: Io/Ir, tr, Isd and Ii values verified.",
      },
      {
        name: "MicroLogic Vigi 7.3 E",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12],
        residualCurrent: {
          kind: "integrated",
          device: "MicroLogic Vigi 7.3 E",
          sensitivities: SCHNEIDER_NSX_VIGI_SENS,
          types: ["A"],
          delays: SCHNEIDER_NSX_VIGI_DELAY,
          sourceNote:
            "Schneider Electric ComPacT NSX MicroLogic 5/6/7 User Guide DOCA0188EN-03, MicroLogic 7 earth-leakage settings: I\\u0394n pickup values by rating and time-delay values verified.",
        },
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03/DOCA0188EN-03, distribution MicroLogic Vigi 7.3 E and protection setting tables: Io/Ir, tr, Isd and Ii verified.",
      },
      {
        name: "MicroLogic 6.3 E",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: SCHNEIDER_NSX_MICROLOGIC_IO,
        ir: SCHNEIDER_NSX_MICROLOGIC_IR,
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12],
        sourceNote:
          "Schneider Electric ComPacT NSX MicroLogic 5/6/7 Electronic Trip Units User Guide DOCA0141EN-03, Long-Time, Short-Time and Instantaneous protection setting tables: Io/Ir, tr, Isd and Ii values verified.",
      },
    ],
    rcdModules: [
      {
        kind: "module",
        device: "VigiPacT Add-on",
        frames: ["NSX100", "NSX160", "NSX250", "NSX400", "NSX630"],
        relayNames: [
          "TM-D",
          "MicroLogic 2.2",
          "MicroLogic 5.2 E",
          "MicroLogic 6.2 E",
          "MicroLogic 2.3",
          "MicroLogic 5.3 E",
          "MicroLogic 6.3 E",
        ],
        excludedClasses: ["R", "HB1", "HB2", "K"],
        sensitivities: SCHNEIDER_NSX_VIGIPACT_SENS,
        types: ["A"],
        delays: SCHNEIDER_NSX_VIGIPACT_DELAY,
        sourceNote:
          "Schneider Electric ComPacT NSX User Guide DOCA0187EN-03, VigiPacT Add-on: installable on NSX100-630 with magnetic, thermal-magnetic or MicroLogic 2/5/6 trip units, not with R/HB1/HB2/K performance; pickup and delay settings verified.",
      },
    ],
    docs: [
      [
        "ComPacT NSX User Guide",
        "https://www.productinfo.schneider-electric.com/compactnsxuserguide/doca0187-compact-nsx-user-guide/",
      ],
      [
        "ComPacT NSX MicroLogic 5/6/7",
        "https://www.productinfo.schneider-electric.com/compactnsxlegacymicrologic_5_6_7/doca0141-compact-nsx-legacy-micrologic-5_6_7/English/DOCA0141EN-03.pdf",
      ],
    ],
  },
  {
    brand: "Schneider Electric",
    series: "ComPacT NSXm",
    image: "assets/schneider-nsxm.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "NSXm63",
        classes: [
          ["E", 16],
          ["B", 25],
          ["F", 36],
          ["N", 50],
          ["H", 70],
        ],
        poles: ["3P", "4P"],
        ratings: [16, 20, 25, 32, 40, 50, 63],
      },
      {
        frame: "NSXm160",
        classes: [
          ["E", 16],
          ["B", 25],
          ["F", 36],
          ["N", 50],
          ["H", 70],
        ],
        poles: ["3P", "4P"],
        ratings: [80, 100, 125, 160],
      },
    ],
    relays: [
      {
        name: "TM-D / TM-G",
        ratingsByFrame: {
          NSXm63: [16, 20, 25, 32, 40, 50, 63],
          NSXm160: [80, 100, 125, 160],
        },
        ir: {
          default: ["0,7 ... 1 x In"],
          20: [NOT_DOCUMENTED],
        },
        tr: {
          default: ["Ikke indstillelig (fast termisk kurve)"],
          20: [NOT_DOCUMENTED],
        },
        imByRating: {
          16: "500A",
          20: NOT_DOCUMENTED,
          25: "600A",
          32: "600A",
          40: "600A",
          50: "600A",
          63: "800A",
          80: "1000A",
          100: "1250A",
          125: "1250A",
          160: "1250A",
        },
        sourceNote:
          "Schneider Electric ComPact NSXm Legacy User Guide DOCA0096EN-02, Circuit Breakers: Thermal Magnetic (TM-D) Protection: Ir is adjustable from 0.7 to 1 x In, tr is non-adjustable, and Ii fixed values are listed by rating. The official NSXm table lists 16, 25, 32, 40, 50, 63, 80, 100, 125, and 160 A; 20 A is therefore marked Ikke dokumenteret af producent. Schneider Electric ComPacT NSX User Guide DOCA0187 thermal-magnetic summary confirms tr is non-adjustable for TM-D and TM-G.",
      },
      {
        name: "MicroLogic 4.1",
        ratingsByFrame: {
          NSXm63: [25, 50],
          NSXm160: [100, 160],
        },
        ir: SCHNEIDER_NSXM_MICROLOGIC_41_IR,
        trFixed: "8s ved 6 x Ir (ikke indstillelig)",
        isd: ["1,5 ... 10 x Ir"],
        iiByRating: SCHNEIDER_NSXM_MICROLOGIC_41_II,
        residualCurrent: {
          kind: "integrated",
          device: "ComPacT NSXm MicroLogic 4.1",
          sensitivities: SCHNEIDER_NSXM_RCD_SENS,
          types: ["A"],
          delays: SCHNEIDER_NSXM_RCD_DELAY,
          sourceNote:
            "Schneider Electric ComPacT NSXm User Guide DOCA0185/DOCA0096, earth-leakage circuit-breaker settings: I\\u0394n pickup and time-delay values verified.",
        },
        sourceNote:
          "Schneider Electric ComPacT NSXm User Guide DOCA0185EN-01, Earth-Leakage Circuit Breakers: preset Ir values by rating, fixed tr values, Isd range and fixed Ii values verified. Schneider Electric LVPED318033EN page A-210 identifies upstream ComPacT NSXm MicroLogic 4.1.",
      },
    ],
    docs: [
      [
        "ComPacT NSXm User Guide",
        "https://www.productinfo.schneider-electric.com/compactnsxmuserguide/",
      ],
    ],
  },
  {
    brand: "Schneider Electric",
    series: "ComPacT NS",
    image: "assets/schneider-ns.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "NS630b",
        classes: [
          ["N", 50],
          ["H", 70],
          ["L", 150],
          ["LB", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [630],
      },
      {
        frame: "NS800",
        classes: [
          ["N", 50],
          ["H", 70],
          ["L", 150],
          ["LB", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [800],
      },
      {
        frame: "NS1000",
        classes: [
          ["N", 50],
          ["H", 70],
          ["L", 150],
          ["LB", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [1000],
      },
      {
        frame: "NS1250",
        classes: [
          ["N", 50],
          ["H", 70],
          ["L", 150],
          ["LB", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [1250],
      },
      {
        frame: "NS1600",
        classes: [
          ["N", 50],
          ["H", 70],
          ["L", 150],
          ["LB", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [1600],
      },
      {
        frame: "NS2000",
        classes: [
          ["N", 70],
          ["H", 85],
        ],
        poles: ["3P", "4P"],
        ratings: [2000],
      },
      {
        frame: "NS2500",
        classes: [
          ["N", 70],
          ["H", 85],
        ],
        poles: ["3P", "4P"],
        ratings: [2500],
      },
      {
        frame: "NS3200",
        classes: [
          ["N", 70],
          ["H", 85],
        ],
        poles: ["3P", "4P"],
        ratings: [3200],
      },
    ],
    relays: [
      {
        name: "MicroLogic 2.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        sourceNote:
          "Schneider Electric ComPacT NS MicroLogic guide DOCA0217EN, MicroLogic 2.0 protection setting tables: Ir, tr and Isd values verified; instantaneous protection is not available for MicroLogic 2.0 and is therefore not displayed.",
      },
      {
        name: "MicroLogic 5.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
        sourceNote:
          "Schneider Electric ComPacT NS MicroLogic guide DOCA0217EN, MicroLogic 5.0 protection setting tables: Ir, tr, Isd and Ii values verified.",
      },
      {
        name: "MicroLogic 6.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
        sourceNote:
          "Schneider Electric ComPacT NS MicroLogic guide DOCA0217EN, MicroLogic 6.0 protection setting tables: Ir, tr, Isd and Ii values verified.",
      },
      {
        name: "MicroLogic 7.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
        sourceNote:
          "Schneider Electric ComPacT NS MicroLogic A/E User Guide DOCA0218EN-00, MicroLogic 7.0 A setting and current-protection tables: Ir, tr, Isd and Ii values verified.",
      },
    ],
    irSettingTypes: [
      {
        id: "standard",
        name: "Standard settings",
        typeNo: "",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
      },
      {
        id: "lower",
        name: "Lower setting",
        typeNo: "C33543",
        ir: [0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8],
      },
      {
        id: "upper",
        name: "Upper setting",
        typeNo: "C33544",
        ir: [0.8, 0.82, 0.85, 0.88, 0.9, 0.92, 0.95, 0.98, 1],
      },
    ],
    docs: [
      [
        "ComPacT NS MicroLogic guide",
        "https://www.se.com/ww/en/download/document/DOCA0217EN/",
      ],
      [
        "ComPacT NS MicroLogic A/E",
        "https://www.productinfo.schneider-electric.com/compactnsmicrologicae/doca0218-compact-ns-micrologic-a-e/",
      ],
    ],
  },
  {
    brand: "Schneider Electric",
    series: "MasterPact MTZ",
    image: "assets/schneider-mtz.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "MTZ1",
        classes: [
          ["H1", 42],
          ["H2", 50],
          ["H3", 66],
          ["L1", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 1000, 1600],
      },
      {
        frame: "MTZ2",
        classes: [
          ["N1", 42],
          ["H1", 66],
          ["H2", 100],
          ["H3", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [800, 1000, 1250, 1600, 2000, 2500, 3200, 4000],
      },
      {
        frame: "MTZ3",
        classes: [
          ["H1", 66],
          ["H2", 100],
          ["H3", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [4000, 5000, 6300],
      },
    ],
    relays: [
      {
        name: "MicroLogic X",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
        residualCurrent: {
          kind: "integrated",
          device: "MicroLogic 7.0 X med ekstern rektangulaer sensor",
          sensitivities: SCHNEIDER_MTZ_RCD_SENS,
          types: ["Earth leakage"],
          delays: SCHNEIDER_MTZ_RCD_DELAY,
          sourceNote:
            "Schneider Electric MasterPacT MTZ MicroLogic X User Guide DOCA0102, MicroLogic 7.0 X IEC earth-leakage protection: I\\u0394n 0.5-30 A in 0.1 A steps and delay settings verified.",
        },
        sourceNote:
          "Schneider Electric MasterPacT MTZ MicroLogic X Control Unit User Guide DOCA0102EN-12, standard protection setting tables for L, S and I: Ir, tr, Isd and Ii values verified.",
      },
    ],
    docs: [
      [
        "MTZ MicroLogic X guide",
        "https://www.se.com/ww/en/download/document/DOCA0102EN/",
      ],
    ],
  },
  {
    brand: "ABB",
    series: "Tmax XT",
    image: "assets/abb-xt.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "XT1",
        classes: [
          ["B", 18],
          ["C", 25],
          ["N", 36],
          ["S", 50],
          ["H", 70],
        ],
        poles: ["3P", "4P"],
        ratings: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160],
      },
      {
        frame: "XT2",
        classes: [
          ["N", 36],
          ["S", 50],
          ["H", 70],
          ["L", 120],
          ["V", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [
          1.6, 2, 2.5, 3.2, 4, 5, 6.3, 8, 10, 12.5, 16, 20, 25, 32, 40, 50, 63,
          80, 100, 125, 160,
        ],
      },
      {
        frame: "XT3",
        classes: [
          ["N", 36],
          ["S", 50],
        ],
        poles: ["3P", "4P"],
        ratings: [63, 80, 100, 125, 160, 200, 250],
      },
      {
        frame: "XT4",
        classes: [
          ["N", 36],
          ["S", 50],
          ["H", 70],
          ["L", 120],
          ["V", 150],
          ["X", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 225, 250],
      },
      {
        frame: "XT5",
        classes: [
          ["N", 36],
          ["S", 50],
          ["H", 70],
          ["L", 120],
          ["V", 200],
          ["X", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [250, 320, 400, 500, 630],
      },
      {
        frame: "XT6",
        classes: [
          ["N", 36],
          ["S", 50],
          ["H", 70],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 800, 1000],
      },
      {
        frame: "XT7",
        classes: [
          ["S", 50],
          ["H", 70],
          ["L", 120],
          ["V", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 800, 1000, 1250, 1600],
      },
    ],
    relays: [
      {
        name: "TMD",
        frames: ["XT1", "XT2", "XT3", "XT4"],
        ratingsByFrame: {
          XT1: [25, 32, 40, 50, 63, 80, 100, 125, 160],
          XT2: [1.6, 2, 2.5, 3.2, 4, 5, 6.3, 8, 10, 12.5, 16, 20, 25, 32],
          XT3: [63, 80, 100, 125, 160, 200, 250],
          XT4: [16, 20, 25, 32],
        },
        ir: [0.7, 0.85, 1],
        trFixed: "Fast termisk kurve",
        imByRating: {
          "XT1|25": "450A",
          "XT1|32": "450A",
          "XT1|40": "450A",
          "XT1|50": "500A",
          "XT1|63": "630A",
          "XT1|80": "800A",
          "XT1|100": "1000A",
          "XT1|125": "1250A",
          "XT1|160": "1600A",
          "XT2|1.6": "16A",
          "XT2|2": "20A",
          "XT2|2.5": "25A",
          "XT2|3.2": "32A",
          "XT2|4": "40A",
          "XT2|5": "50A",
          "XT2|6.3": "63A",
          "XT2|8": "80A",
          "XT2|10": "100A",
          "XT2|12.5": "125A",
          "XT2|16": "300A",
          "XT2|20": "300A",
          "XT2|25": "300A",
          "XT2|32": "320A",
          "XT3|63": "630A",
          "XT3|80": "800A",
          "XT3|100": "1000A",
          "XT3|125": "1250A",
          "XT3|160": "1600A",
          "XT3|200": "2000A",
          "XT3|250": "2500A",
          "XT4|16": "300A",
          "XT4|20": "300A",
          "XT4|25": "300A",
          "XT4|32": "320A",
        },
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/19-3/20. XT3 TMD verified as 63, 80, 100, 125, 160, 200, 250 A.",
      },
      {
        name: "TMA",
        frames: ["XT2", "XT4", "XT5", "XT6"],
        ratingsByFrame: {
          XT2: [40, 50, 63, 80, 100, 125, 160],
          XT4: [40, 50, 63, 80, 100, 125, 160, 200, 225, 250],
          XT5: [320, 400, 500, 630],
          XT6: [630, 800],
        },
        ir: [0.7, 0.85, 1],
        trFixed: "Fast termisk kurve",
        imByRating: {
          "XT2|40": "300-400A",
          "XT2|50": "300-500A",
          "XT2|63": "300-630A",
          "XT2|80": "400-800A",
          "XT2|100": "500-1000A",
          "XT2|125": "625-1250A",
          "XT2|160": "800-1600A",
          "XT4|40": "300-400A",
          "XT4|50": "300-500A",
          "XT4|63": "315-630A",
          "XT4|80": "400-800A",
          "XT4|100": "500-1000A",
          "XT4|125": "625-1250A",
          "XT4|160": "800-1600A",
          "XT4|200": "1000-2000A",
          "XT4|225": "1125-2250A",
          "XT4|250": "1250-2500A",
          "XT5|320": "1600-3200A",
          "XT5|400": "2000-4000A",
          "XT5|500": "2500-5000A",
          "XT5|630": "3150-6300A",
          "XT6|630": "3150-6300A",
          "XT6|800": "4000-8000A",
        },
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/19-3/20. TMA verified for XT2, XT4, XT5 and XT6.",
      },
      {
        name: "Ekip Dip",
        frames: ["XT2", "XT4", "XT5", "XT6", "XT7"],
        ratingsByFrame: {
          XT2: [10, 25, 40, 63, 100, 160],
          XT4: [40, 63, 100, 160, 250],
          XT5: [250, 320, 400, 630],
          XT6: [630, 800, 1000],
          XT7: [630, 800, 1000, 1250, 1600],
        },
        ir: ABB_DIP_L,
        tr: {
          XT2: [3, 12, 36, 60],
          XT4: [3, 12, 36, 60],
          XT5: [3, 12, 36, 48],
          "XT6|630": [NOT_DOCUMENTED],
          "XT6|800": [3, 12, 36, 72],
          "XT6|1000": [3, 12, 36, 42],
          XT7: [3, 12, 24, 36, 48, 72, 108, 144],
        },
        isd: {
          XT2: ABB_DIP_S_XT2_XT6,
          XT4: ABB_DIP_S_XT2_XT6,
          XT5: ABB_DIP_S_XT2_XT6,
          XT6: ABB_DIP_S_XT2_XT6,
          XT7: ABB_DIP_S_XT7_EMAX,
        },
        ii: {
          XT2: ABB_DIP_I_XT2_XT6,
          XT4: ABB_DIP_I_XT2_XT6,
          XT5: ABB_DIP_I_XT2_XT6,
          XT6: ABB_DIP_I_XT2_XT6,
          XT7: ABB_DIP_I_XT7_EMAX,
        },
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/23-3/26. Ekip Dip L/tr/S/I steps verified per frame where listed.",
      },
      {
        name: "Ekip Touch",
        frames: ["XT2", "XT4", "XT5", "XT7"],
        ratingsByFrame: {
          XT2: [40, 63, 100, 160],
          XT4: [100, 160, 250],
          XT5: [250, 320, 400, 630],
          XT7: [630, 800, 1000, 1250, 1600],
        },
        ir: ABB_TOUCH_L,
        tr: {
          XT2: stepValues(3, 60, 1),
          XT4: stepValues(3, 60, 1),
          XT5: stepValues(3, 48, 1),
          XT7: stepValues(3, 144, 1),
        },
        isd: ABB_TOUCH_S,
        ii: {
          XT2: ABB_TOUCH_I_XT2_XT5,
          XT4: ABB_TOUCH_I_XT2_XT5,
          XT5: ABB_TOUCH_I_XT2_XT5,
          XT7: ABB_TOUCH_I_XT7_EMAX,
        },
        residualCurrent: {
          kind: "integrated",
          device: "Ekip Touch Rc",
          sensitivities: ABB_RC_SENS,
          types: ["Rc"],
          delays: ABB_RC_DELAY,
          sourceNote:
            "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/30 and 3/35: Rc residual-current function with residual-current rating plug and external toroid; I\\u0394n and t\\u0394n values verified.",
        },
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/30-3/34 and 3/50. Ekip Touch L/tr/S/I steps verified per frame.",
      },
      {
        name: "Ekip Hi-Touch",
        frames: ["XT2", "XT4", "XT5", "XT7"],
        ratingsByFrame: {
          XT2: [40, 63, 100, 160],
          XT4: [100, 160, 250],
          XT5: [250, 320, 400, 630],
          XT7: [630, 800, 1000, 1250, 1600],
        },
        ir: ABB_TOUCH_L,
        tr: {
          XT2: stepValues(3, 60, 1),
          XT4: stepValues(3, 60, 1),
          XT5: stepValues(3, 48, 1),
          XT7: stepValues(3, 144, 1),
        },
        isd: ABB_TOUCH_S,
        ii: {
          XT2: ABB_TOUCH_I_XT2_XT5,
          XT4: ABB_TOUCH_I_XT2_XT5,
          XT5: ABB_TOUCH_I_XT2_XT5,
          XT7: ABB_TOUCH_I_XT7_EMAX,
        },
        residualCurrent: {
          kind: "integrated",
          device: "Ekip Hi-Touch Rc",
          sensitivities: ABB_RC_SENS,
          types: ["Rc"],
          delays: ABB_RC_DELAY,
          sourceNote:
            "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/30 and 3/35: Rc residual-current function with residual-current rating plug and external toroid; I\\u0394n and t\\u0394n values verified.",
        },
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/30-3/34 and 3/50. Ekip Hi-Touch L/tr/S/I steps verified per frame.",
      },
    ],
    rcdModules: [
      {
        kind: "module",
        device: "RC Sel 200 XT1",
        frames: ["XT1"],
        relayNames: ["TMD"],
        sensitivities: ABB_XT_RC_SEL_SENS,
        types: ["A"],
        delays: ABB_XT_RC_SEL_DELAY,
        sourceNote:
          "ABB SACE Tmax XT technical catalogue 1SDC210033D0201, pp. 3/28-3/32, table Residual current releases and table Electrical characteristic - Residual current devices: RC Sel 200 for XT1 verified as Type A; thresholds 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5 and 10 A and instantaneous/0.1/0.2/0.3/0.5/1/2/3 s non-trip settings verified. No separate Type AC variant is documented.",
      },
      {
        kind: "module",
        device: "RC Inst XT1-XT3",
        frames: ["XT1", "XT3"],
        relayNames: ["TMD"],
        sensitivities: ABB_XT_RC_INST_SENS,
        types: ["A"],
        delays: ABB_XT_RC_INST_DELAY,
        sourceNote:
          "ABB SACE Tmax XT technical catalogue 1SDC210033D0201, pp. 3/28-3/32, table Residual current releases and table Electrical characteristic - Residual current devices: RC Inst for XT1 and XT3 verified as Type A; thresholds 0.03, 0.1, 0.3, 0.5, 1 and 3 A and instantaneous timing verified. No separate Type AC variant is documented.",
      },
      {
        kind: "module",
        device: "RC Sel XT1-XT3",
        frames: ["XT1", "XT3"],
        relayNames: ["TMD"],
        sensitivities: ABB_XT_RC_SEL_SENS,
        types: ["A"],
        delays: ABB_XT_RC_SEL_DELAY,
        sourceNote:
          "ABB SACE Tmax XT technical catalogue 1SDC210033D0201, pp. 3/28-3/32, table Residual current releases and table Electrical characteristic - Residual current devices: RC Sel for XT1 and XT3 verified as Type A; thresholds 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5 and 10 A and instantaneous/0.1/0.2/0.3/0.5/1/2/3 s non-trip settings verified. No separate Type AC variant is documented.",
      },
      {
        kind: "module",
        device: "RC B Type XT3",
        frames: ["XT3"],
        relayNames: ["TMD"],
        sensitivities: ABB_XT_RC_B_SENS,
        types: ["B"],
        delays: ABB_XT_RC_B_DELAY,
        sourceNote:
          "ABB SACE Tmax XT technical catalogue 1SDC210033D0201, pp. 3/28-3/32, table Residual current releases and table Electrical characteristic - Residual current devices: RC B Type for XT3 verified as Type B; thresholds 0.03, 0.05, 0.1, 0.3, 0.5 and 1 A, non-trip time settings 0/0.1/0.2/0.3/0.5/1/2/3 s and fault-frequency settings 400/700/1000 Hz verified.",
      },
      {
        kind: "module",
        device: "RC Sel XT2-XT4",
        frames: ["XT2", "XT4"],
        relayNames: ["TMD", "TMA"],
        sensitivities: ABB_XT_RC_SEL_SENS,
        types: ["A"],
        delays: ABB_XT_RC_SEL_DELAY,
        sourceNote:
          "ABB SACE Tmax XT technical catalogue 1SDC210033D0201, pp. 3/28-3/32, table Residual current releases and table Electrical characteristic - Residual current devices: RC Sel for XT2 and XT4 verified as Type A; thresholds 0.03, 0.05, 0.1, 0.3, 0.5, 1, 3, 5 and 10 A and instantaneous/0.1/0.2/0.3/0.5/1/2/3 s non-trip settings verified. No separate Type AC variant is documented.",
      },
    ],
    docs: [
      [
        "ABB Tmax XT",
        "https://new.abb.com/low-voltage/products/circuit-breakers/tmax-xt",
      ],
      [
        "ABB Tmax XT IEC catalog 2024",
        "https://library.e.abb.com/public/946efedf6071472681c39488ef6b2f12/1SDC210100D0206_Tmax%20XT_IEC_EN_08_2024.pdf",
      ],
    ],
  },
  {
    brand: "ABB",
    series: "Emax 2",
    image: "assets/abb-emax.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "E1.2",
        classes: [
          ["B", 42],
          ["N", 66],
          ["S", 100],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 800, 1000, 1250, 1600],
      },
      {
        frame: "E2.2",
        classes: [
          ["B", 42],
          ["N", 66],
          ["S", 100],
          ["H", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [800, 1000, 1250, 1600, 2000, 2500],
      },
      {
        frame: "E4.2",
        classes: [
          ["N", 66],
          ["S", 100],
          ["H", 150],
          ["V", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [3200, 4000],
      },
      {
        frame: "E6.2",
        classes: [
          ["N", 66],
          ["S", 100],
          ["H", 150],
          ["V", 200],
        ],
        poles: ["3P", "4P"],
        ratings: [4000, 5000, 6300],
      },
    ],
    relays: [
      {
        name: "Ekip Dip",
        ir: ABB_DIP_L,
        tr: ABB_EMAX2_DIP_TR,
        isd: ABB_DIP_S_XT7_EMAX,
        ii: ABB_DIP_I_XT7_EMAX,
        sourceNote:
          "ABB Emax 2 Ekip Dip manual 1SDH001000R0002, operator interface and summary table: L/tr/S/I DIP switch steps verified.",
      },
      {
        name: "Ekip Touch",
        ir: ABB_TOUCH_L,
        tr: stepValues(3, 144, 1),
        isd: ABB_TOUCH_S,
        ii: ABB_TOUCH_I_XT7_EMAX,
        residualCurrent: {
          kind: "integrated",
          device: "Ekip Touch Rc",
          sensitivities: ABB_EMAX2_RC_SENS,
          types: ["Rc"],
          delays: ABB_EMAX2_RC_DELAY,
          sourceNote:
            "ABB SACE Emax 2 engineering manual 1SDH001330R1002, Rc protection: external Rc toroid, Rc rating plug, Idn 3-30 A and Tdn 0.05-0.8 s verified.",
        },
        sourceNote:
          "ABB Emax 2 Ekip Touch/Hi-Touch manual 1SDH001316R1002, standard protections table: L/tr/S/I steps verified.",
      },
      {
        name: "Ekip Hi-Touch",
        ir: ABB_TOUCH_L,
        tr: stepValues(3, 144, 1),
        isd: ABB_TOUCH_S,
        ii: ABB_TOUCH_I_XT7_EMAX,
        residualCurrent: {
          kind: "integrated",
          device: "Ekip Hi-Touch Rc",
          sensitivities: ABB_EMAX2_RC_SENS,
          types: ["Rc"],
          delays: ABB_EMAX2_RC_DELAY,
          sourceNote:
            "ABB SACE Emax 2 engineering manual 1SDH001330R1002, Rc protection: external Rc toroid, Rc rating plug, Idn 3-30 A and Tdn 0.05-0.8 s verified.",
        },
        sourceNote:
          "ABB Emax 2 Ekip Touch/Hi-Touch manual 1SDH001316R1002, standard protections table: L/tr/S/I steps verified.",
      },
    ],
    docs: [
      [
        "ABB Emax 2",
        "https://new.abb.com/low-voltage/products/circuit-breakers/air-circuit-breakers/emax2",
      ],
    ],
  },
  {
    brand: "Siemens",
    series: "3VA",
    image: "assets/siemens-3va.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "3VA20 100",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [25, 40, 63, 80, 100],
      },
      {
        frame: "3VA21 160",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [25, 40, 63, 80, 100, 125, 160],
      },
      {
        frame: "3VA22 250",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [160, 200, 250],
      },
      {
        frame: "3VA23 400",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [250, 320, 400],
      },
      {
        frame: "3VA24 630",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
          ["L", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [400, 500, 630],
      },
      {
        frame: "3VA25 1000",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 800, 1000],
      },
      {
        frame: "3VA26 1250",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
        ],
        poles: ["3P", "4P"],
        ratings: [1250],
      },
      {
        frame: "3VA27 1600",
        classes: [
          ["M", 55],
          ["H", 85],
          ["C", 110],
        ],
        poles: ["3P", "4P"],
        ratings: [800, 1000, 1250, 1600],
      },
    ],
    relays: [
      {
        name: "ETU320 LI",
        frames: [
          "3VA20 100",
          "3VA21 160",
          "3VA22 250",
          "3VA23 400",
          "3VA24 630",
          "3VA25 1000",
          "3VA26 1250",
          "3VA27 1600",
        ],
        ir: SIEMENS_3VA_ETU3_IR,
        tr: SIEMENS_3VA_ETU3_TR,
        ii: SIEMENS_3VA_ETU320_II,
        functions: ["L", "I", "N"],
        sourceNote:
          "Siemens 3VA IEC manual 03/2019 and 3VA27/3WL10 equipment manual: ETU320 LI L/tr/I steps verified per frame/rating where listed.",
      },
      {
        name: "ETU350 LSI",
        frames: [
          "3VA20 100",
          "3VA21 160",
          "3VA22 250",
          "3VA23 400",
          "3VA24 630",
          "3VA25 1000",
          "3VA26 1250",
          "3VA27 1600",
        ],
        ir: SIEMENS_3VA_ETU3_IR,
        tr: SIEMENS_3VA_ETU3_TR,
        isd: SIEMENS_3VA_ETU350_ISD,
        ii: SIEMENS_3VA_ETU350_II,
        iiByRating: SIEMENS_3VA_ETU350_II_FIXED,
        functions: ["L", "S", "I", "N"],
        sourceNote:
          "Siemens 3VA IEC manual 03/2019 and 3VA27/3WL10 equipment manual: ETU350 LSI L/tr/S/I steps verified per frame/rating where listed.",
      },
      {
        name: "ETU360 LSIG",
        frames: ["3VA27 1600"],
        ir: SIEMENS_3VA27_ETU3_IR,
        tr: SIEMENS_3VA27_ETU3_TR,
        isd: SIEMENS_3VA27_ETU3_ISD,
        ii: SIEMENS_3VA27_ETU3_II,
        functions: ["L", "S", "I", "G", "N"],
        sourceNote:
          "Siemens 3VA27/3WL10 equipment manual: ETU360 LSIG L/tr/S/I steps and LSIG functions verified for 3VA27.",
      },
      {
        name: "ETU850 LSI",
        frames: Object.keys(SIEMENS_3VA_ETU850_RATINGS_BY_FRAME),
        ratingsByFrame: SIEMENS_3VA_ETU850_RATINGS_BY_FRAME,
        ir: SIEMENS_3VA_ETU850_IR,
        tr: SIEMENS_3VA_ETU850_TR,
        isd: SIEMENS_3VA_ETU850_ISD,
        isdBase: "In",
        ii: SIEMENS_3VA_ETU850_II,
        functions: ["L", "S", "I", "N"],
        sourceNote:
          "Siemens 3VA IEC manual 03/2019 A5E03603177010-03, section 3.2.1.2 ETU550/ETU850 parameters table p.133 and setting notes p.134: ETU850 LSI L/tr/S/I ranges verified for 3VA2 sizes 100 A to 1000 A.",
      },
      {
        name: "ETU650 LSI",
        frames: ["3VA27 1600"],
        ir: SIEMENS_3VA_ETU6_IR,
        tr: SIEMENS_3VA_ETU6_TR,
        isd: SIEMENS_3VA_ETU6_ISD,
        ii: SIEMENS_3VA_ETU6_II,
        functions: ["L", "S", "I", "N", "MCR", "I-NBA", "DAS", "DST"],
        sourceNote:
          "Siemens LV 10 2025 and 3VA27/3WL10 equipment manual: ETU650 LSI L/tr/S/I step ranges verified for 3VA27.",
      },
      {
        name: "ETU660 LSIG",
        frames: ["3VA27 1600"],
        ir: SIEMENS_3VA_ETU6_IR,
        tr: SIEMENS_3VA_ETU6_TR,
        isd: SIEMENS_3VA_ETU6_ISD,
        ii: SIEMENS_3VA_ETU6_II,
        functions: [
          "L",
          "S",
          "I",
          "G",
          "N",
          "MCR",
          "I-NBA",
          "DAS",
          "Gret",
          "DST",
        ],
        sourceNote:
          "Siemens LV 10 2025 and 3VA27/3WL10 equipment manual: ETU660 LSIG L/tr/S/I step ranges verified for 3VA27.",
      },
    ],
    rcdModules: [
      {
        kind: "module",
        device: "RCD820",
        frames: [
          "3VA20 100",
          "3VA21 160",
          "3VA22 250",
          "3VA23 400",
          "3VA24 630",
          "3VA25 1000",
          "3VA26 1250",
          "3VA27 1600",
        ],
        sensitivities: SIEMENS_3VA_RCD820_SENS,
        types: SIEMENS_3VA_RCD820_TYPES,
        delays: SIEMENS_3VA_RCD820_DELAY,
        sourceNote:
          "Siemens 3VA IEC manual 03/2019, section 4.8 Residual current devices: RCD820 for 3VA2, response current 0.03-30 A in ten steps and delay 0-10000 ms in ten steps verified.",
      },
    ],
    docs: [
      [
        "Siemens 3VA IEC manual 03/2019",
        "https://support.industry.siemens.com/cs/attachments/90318775/3VA_manual_molded_case_circuit_breakers_en_en-US.pdf?download=true",
      ],
      [
        "Siemens LV 10 2025 molded case circuit breakers",
        "https://support.industry.siemens.com/cs/attachments/109750637/02_MoldedCaseCircuitBreakers_LV10_2025_EN_202412200153522186.pdf",
      ],
      [
        "Siemens 3VA27 and 3WL10 equipment manual",
        "https://support.industry.siemens.com/cs/attachments/109753821/MAN_L1V30499596002A_RS-AA_004_en_en-US.pdf",
      ],
    ],
  },
  {
    brand: "Siemens",
    series: "3WA",
    image: "assets/siemens-3wl.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "3WA11 Size 1",
        classes: [
          ["N", 55],
          ["S", 66],
          ["M", 85],
        ],
        poles: ["3P", "4P"],
        ratings: SIEMENS_3WA_RATINGS_BY_FRAME["3WA11 Size 1"],
      },
      {
        frame: "3WA12 Size 2",
        classes: [
          ["S", 66],
          ["M", 85],
          ["H", 100],
          ["C", 130],
        ],
        poles: ["3P", "4P"],
        ratings: SIEMENS_3WA_RATINGS_BY_FRAME["3WA12 Size 2"],
      },
      {
        frame: "3WA13 Size 3",
        classes: [
          ["H", 100],
          ["C", 150],
          ["E", 130],
        ],
        poles: ["3P", "4P"],
        ratings: SIEMENS_3WA_RATINGS_BY_FRAME["3WA13 Size 3"],
      },
    ],
    relays: [
      {
        name: "ETU300 LSI",
        ratingsByFrame: SIEMENS_3WA_RATINGS_BY_FRAME,
        ir: SIEMENS_3WA_ETU300_IR,
        tr: SIEMENS_3WA_ETU300_TR,
        isd: SIEMENS_3WA_ETU300_ISD,
        ii: SIEMENS_3WA_ETU300_II,
        functions: ["L", "S", "I"],
        sourceNote:
          "Siemens 3WA1 air circuit breaker Equipment Manual 05/2023, p. 47 option plug In table and p. 85 ETU300 LSI/LSIG setting range table: Ir, tr, Isd and Ii rotary-switch settings verified. Isd OFF and ETU300 LSIG ground-fault settings are documented but not represented as L/S/I setting suggestions.",
      },
      {
        name: "ETU300 LSIG",
        ratingsByFrame: SIEMENS_3WA_RATINGS_BY_FRAME,
        ir: SIEMENS_3WA_ETU300_IR,
        tr: SIEMENS_3WA_ETU300_TR,
        isd: SIEMENS_3WA_ETU300_ISD,
        ii: SIEMENS_3WA_ETU300_II,
        functions: ["L", "S", "I", "G"],
        sourceNote:
          "Siemens 3WA1 air circuit breaker Equipment Manual 05/2023, p. 47 option plug In table and p. 85 ETU300 LSI/LSIG setting range table: Ir, tr, Isd and Ii rotary-switch settings verified. ETU300 LSIG ground-fault protection is documented as residual GF with Ig 0.2 x In, min. 100 A, max. 1200 A and tg 0.2 s.",
      },
      {
        name: "ETU600 LSI",
        ratingsByFrame: SIEMENS_3WA_RATINGS_BY_FRAME,
        ir: SIEMENS_3WA_ETU600_IR,
        tr: SIEMENS_3WA_ETU600_TR,
        isd: SIEMENS_3WA_ETU600_ISD,
        ii: SIEMENS_3WA_ETU600_II,
        functions: ["L", "S", "I"],
        sourceNote:
          "Siemens 3WA1 air circuit breaker Equipment Manual 05/2023, p. 47 option plug In table and p. 115 ETU600 setting range table: Ir, tr, Isd and Ii rotary-switch settings verified. Wider e.SET ranges are documented on the same page but are not interpolated in the database.",
      },
      {
        name: "ETU600 LSIG",
        ratingsByFrame: SIEMENS_3WA_RATINGS_BY_FRAME,
        ir: SIEMENS_3WA_ETU600_IR,
        tr: SIEMENS_3WA_ETU600_TR,
        isd: SIEMENS_3WA_ETU600_ISD,
        ii: SIEMENS_3WA_ETU600_II,
        functions: ["L", "S", "I", "G"],
        sourceNote:
          "Siemens 3WA1 air circuit breaker Equipment Manual 05/2023, p. 47 option plug In table, p. 115 ETU600 L/S/I setting range table and p. 116 ETU600 LSIG ground-fault table: Ir, tr, Isd, Ii and GF availability verified. GF Ig ranges are documented by size but not shown as residual-current/RCD module.",
      },
      {
        name: "ETU600 LSIG Hi-Z",
        ratingsByFrame: SIEMENS_3WA_RATINGS_BY_FRAME,
        ir: SIEMENS_3WA_ETU600_IR,
        tr: SIEMENS_3WA_ETU600_TR,
        isd: SIEMENS_3WA_ETU600_ISD,
        ii: SIEMENS_3WA_ETU600_II,
        functions: ["L", "S", "I", "G", "Hi-Z"],
        sourceNote:
          "Siemens 3WA1 air circuit breaker Equipment Manual 05/2023, p. 47 option plug In table, p. 115 ETU600 L/S/I setting range table and pp. 116-117 ETU600 LSIG Hi-Z ground-fault table: Ir, tr, Isd, Ii and GF Hi-Z availability verified. REF/UREF settings depend on external CT and shunt data and are not interpolated.",
      },
    ],
    docs: [
      [
        "Siemens 3WA1 air circuit breaker Equipment Manual",
        "https://cache.industry.siemens.com/dl/files/061/109763061/att_1144447/v3/MAN_92310000002-07_en_en-US.pdf",
      ],
      [
        "Siemens SENTRON 3WA air circuit breaker",
        "https://www.siemens.com/en-us/products/sentron/3wa-air-circuit-breakers/",
      ],
    ],
  },
  {
    brand: "Siemens",
    series: "3WL",
    image: "assets/siemens-3wl.svg",
    status: "Lukket",
    statusClass: "ok",
    frames: [
      {
        frame: "3WL Size I",
        classes: [
          ["N", 55],
          ["S", 66],
          ["H", 85],
        ],
        poles: ["3P", "4P"],
        ratings: [630, 800, 1000, 1250, 1600, 2000],
      },
      {
        frame: "3WL Size II",
        classes: [
          ["N", 66],
          ["S", 80],
          ["H", 100],
          ["C", 130],
        ],
        poles: ["3P", "4P"],
        ratings: [800, 1000, 1250, 1600, 2000, 2500, 3200, 4000],
      },
      {
        frame: "3WL Size III",
        classes: [
          ["H", 100],
          ["C", 130],
          ["B", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [4000, 5000, 6300],
      },
    ],
    relays: [
      {
        name: "ETU15B",
        frames: ["3WL Size I", "3WL Size II"],
        ir: SIEMENS_3WL_ETU15_IR,
        trFixed: "10s fixed at 6 x IR",
        ii: [2, 3, 4, 5, 6, 7, 8],
        functions: ["L", "I"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014, function overview page 35: ETU15B L/tr/I steps verified; ETU15B cannot be used with Size III.",
      },
      {
        name: "ETU25B",
        ir: SIEMENS_3WL_ETU25_IR,
        trFixed: "10s fixed at 6 x IR",
        isd: SIEMENS_3WL_ETU25_ISD,
        iiByRating: SIEMENS_3WL_ETU25_II_FIXED,
        functions: ["L", "S", "I"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014, function overview page 35: ETU25B L/tr/S/I fixed threshold verified.",
      },
      {
        name: "ETU27B",
        ir: SIEMENS_3WL_ETU25_IR,
        trFixed: "10s fixed at 6 x IR",
        isd: SIEMENS_3WL_ETU25_ISD,
        iiByRating: SIEMENS_3WL_ETU25_II_FIXED,
        functions: ["L", "N", "S", "I", "G"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014, function overview page 35: ETU27B L/tr/S/I fixed threshold, N and G verified.",
      },
      {
        name: "ETU45B",
        ir: SIEMENS_3WL_ETU25_IR,
        tr: SIEMENS_3WL_ETU45_TR,
        isd: SIEMENS_3WL_ETU25_ISD,
        ii: SIEMENS_3WL_ETU45_II,
        functions: ["L", "N", "S", "I", "G optional"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014, function overview page 36: ETU45B L/tr/S/I numeric steps verified; 0.8 x Ics instantaneous variant depends on Ics.",
      },
      {
        name: "ETU55B",
        ir: [NOT_DOCUMENTED],
        tr: [NOT_DOCUMENTED],
        isd: [NOT_DOCUMENTED],
        ii: [NOT_DOCUMENTED],
        functions: ["L", "N", "S", "I", "G optional"],
        sourceNote:
          "Siemens 3WL operating instructions and software manual mention ETU55B parameterization, but no official ETU55B-specific Ir/tr/Isd/Ii value table was found.",
      },
      {
        name: "ETU76B",
        ir: ["0,4 ... 1 x In"],
        tr: ["2 ... 30 s (I2t), 1 ... 5 s (I4t)"],
        isd: ["1,25 x In ... 0,8 x Icw"],
        ii: ["1,5 x In ... 0,8 x Ics"],
        functions: ["L", "N", "S", "I", "G optional"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014, function overview page 36: ETU76B Ir/tr/Isd/Ii ranges verified; menu increment table on page 36 defines permissible ETU76B setting step widths. Siemens 3WL circuit breaker software manual 08/2011, pages 21 and 34: ETU55B/ETU76B values are entered directly and checked against these step widths.",
      },
    ],
    docs: [
      [
        "Siemens 3WL Air Circuit Breakers",
        "https://cache.industry.siemens.com/dl/files/108/35681108/att_959423/v1/SENTRON_LV10-PH01_complete_English_04-2018_201808090842560250.pdf",
      ],
      [
        "Siemens 3WL ETU test software",
        "https://support.industry.siemens.com/cs/attachments/23117754/3WL_CB_SW_en_129769828379337186.pdf",
      ],
    ],
  },
];
let st = {
  brand: DATA[0].brand,
  series: DATA[0].series,
  frame: 0,
  cls: 0,
  relay: "",
  rating: 0,
  poles: 0,
  desired: "125",
  ikmin: "3,1",
  ikmax: "14",
  inc: "160",
  method: "Calculated settings",
  irSetting: "standard",
  backupComponent: "all",
  rcdEnabled: false,
  rcdDevice: 0,
  rcdSensitivity: 0,
  rcdType: 0,
  rcdDelay: 0,
  rcdIntegratedAuto: false,
};
const $ = (id) => document.getElementById(id),
  V = VERIFY;
const uniq = (a) => [...new Set(a)];
const parseDk = (v) =>
  Number(
    String(v ?? "")
      .replace(",", ".")
      .replace(/[^0-9.\-]/g, ""),
  ) || 0;
const fmt = (v) => String(v).replace(/\.0$/, "").replace(".", ",");
const fmtA = (v) => {
  const n = Number(v);
  return (
    (Number.isFinite(n) ? fmt(Math.round(n * 100) / 100) : String(v)) + "A"
  );
};
const isN = (x) => typeof x === "number" && !Number.isNaN(x);
const statusText = (vals) =>
  Array.isArray(vals) && vals.length === 1 && typeof vals[0] === "string"
    ? vals[0]
    : V;
function S() {
  return (
    DATA.find((x) => x.brand === st.brand && x.series === st.series) || DATA[0]
  );
}
function F() {
  return S().frames[st.frame] || S().frames[0];
}
function C() {
  return F().classes[st.cls] || F().classes[0];
}
function P() {
  return F().poles[st.poles] || F().poles[0];
}
function relayDisplayRank(relay) {
  const name = relay.name || "";
  if (/^(TM-D|TM-G|TM-D \/ TM-G|TMD|TMA|Thermal-magnetic)/i.test(name))
    return 900;
  if (/^Ekip Hi-Touch/i.test(name)) return 122;
  if (/^Ekip Touch/i.test(name)) return 121;
  if (/^Ekip Dip/i.test(name)) return 120;
  const microLogic = name.match(/^MicroLogic(?: Vigi)?\s+(\d+(?:\.\d+)?)/i);
  if (microLogic) return 100 + Number(microLogic[1]);
  if (/^MicroLogic X/i.test(name)) return 100;
  const etu = name.match(/^ETU(\d+)/i);
  if (etu) return 100 + Number(etu[1]) / 10;
  return 500;
}
function relays() {
  const f = F().frame;
  return S()
    .relays.filter((r) => !r.frames || r.frames.includes(f))
    .map((relay, index) => ({ relay, index }))
    .sort((a, b) => {
      const rank = relayDisplayRank(a.relay) - relayDisplayRank(b.relay);
      if (rank) return rank;
      return a.index - b.index;
    })
    .map((item) => item.relay);
}
function R() {
  const list = relays();
  let r = list.find((x) => x.name === st.relay) || list[0];
  st.relay = r ? r.name : "";
  return r;
}
function ratings() {
  const r = R(),
    f = F();
  return r.ratingsByFrame && r.ratingsByFrame[f.frame]
    ? r.ratingsByFrame[f.frame]
    : f.ratings;
}
function rating() {
  const rs = ratings();
  if (st.rating >= rs.length) st.rating = rs.length - 1;
  return rs[st.rating] || rs[0];
}
function fill(id, vals, sel) {
  $(id).innerHTML = vals
    .map(
      (v) =>
        `<option value="${v}" ${v === sel ? "selected" : ""}>${v}</option>`,
    )
    .join("");
}
function fillIdx(id, vals, sel) {
  $(id).innerHTML = vals
    .map(
      (v, i) =>
        `<option value="${i}" ${i === sel ? "selected" : ""}>${v}</option>`,
    )
    .join("");
}
function best(bases, factors, desired) {
  if (!factors || !factors.length) return null;
  if (!factors.every(isN)) return { verify: true, status: statusText(factors) };
  let out = null,
    lowest = null;
  const eps = 0.000001;
  for (const b of bases)
    for (const f of factors) {
      const value = Number((b * f).toFixed(6)),
        diff = desired - value,
        candidate = { base: b, factor: f, value, diff };
      if (!lowest || candidate.value < lowest.value) lowest = candidate;
      if (candidate.value > desired + eps) continue;
      if (!out) {
        out = candidate;
        continue;
      }
      if (candidate.diff < out.diff - eps) {
        out = candidate;
        continue;
      }
      if (Math.abs(candidate.diff - out.diff) <= eps) {
        const fine = Math.abs(candidate.factor - 1),
          outFine = Math.abs(out.factor - 1);
        if (fine < outFine - eps) {
          out = candidate;
          continue;
        }
        if (Math.abs(fine - outFine) <= eps) {
          const baseDistance = Math.abs(candidate.base - desired),
            outBaseDistance = Math.abs(out.base - desired);
          if (
            baseDistance < outBaseDistance - eps ||
            (Math.abs(baseDistance - outBaseDistance) <= eps &&
              candidate.base < out.base)
          )
            out = candidate;
        }
      }
    }
  if (out) return out;
  return {
    error: true,
    minValue: lowest ? lowest.value : 0,
    desired,
  };
}
function under(factors, base, limit) {
  if (!factors || !factors.length) return null;
  if (!factors.every(isN)) return { verify: true, status: statusText(factors) };
  const min = factors[0] * base;
  if (min > limit)
    return { error: true, factor: factors[0], value: min, limit };
  let out = null;
  for (const f of factors) {
    const value = f * base;
    if (value <= limit && (!out || value > out.value))
      out = { factor: f, value };
  }
  return out;
}
function range(vals, sel, formatter) {
  if (!vals || !vals.length) return NOT_DOCUMENTED;
  if (!vals.every(isN)) return statusText(vals);
  if (vals.length === 1) return formatter(sel);
  return `${formatter(vals[0])} - <u>${formatter(sel)}</u> - ${formatter(vals[vals.length - 1])}`;
}
function settingText(raw, inA) {
  if (!raw) return null;
  if (raw === V || raw === NOT_DOCUMENTED) return raw;
  if (String(raw).endsWith("A")) return raw;
  if (String(raw).includes("-")) {
    const p = String(raw).replace("xIn", "").split("-").map(parseDk);
    return `${raw} = ${fmtA(p[0] * inA)}-${fmtA(p[1] * inA)}`;
  }
  const f = parseDk(String(raw).replace("xIn", ""));
  return `${raw} = ${fmtA(f * inA)}`;
}
function ratingSetting(map, f, inA) {
  if (!map) return undefined;
  return map[`${f.frame}|${inA}`] ?? map[String(inA)];
}
function settingValues(raw, f, inA, fallback = []) {
  if (!raw) return fallback;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object")
    return (
      raw[`${f.frame}|${inA}`] ??
      raw[f.frame] ??
      raw[String(inA)] ??
      raw.default ??
      fallback
    );
  return fallback;
}
function resetResidual() {
  st.rcdEnabled = false;
  st.rcdDevice = 0;
  st.rcdSensitivity = 0;
  st.rcdType = 0;
  st.rcdDelay = 0;
  st.rcdIntegratedAuto = false;
}
function residualValues(raw, f, inA) {
  return settingValues(raw, f, inA, []).filter((x) => x !== undefined && x !== null);
}
function residualModules(s, f, c, r, inA) {
  return (s.rcdModules || []).filter((m) => {
    if (m.frames && !m.frames.includes(f.frame)) return false;
    if (m.relayNames && !m.relayNames.includes(r.name)) return false;
    if (m.excludedClasses && m.excludedClasses.includes(c[0])) return false;
    if (m.maxRating && inA > m.maxRating) return false;
    return true;
  });
}
function residualOptions(s, f, c, r, inA) {
  const options = [];
  if (r.residualCurrent) options.push(r.residualCurrent);
  residualModules(s, f, c, r, inA).forEach((m) => options.push(m));
  return options;
}
function setWrap(id, visible) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden", !visible);
}
function renderResidualControls(s, f, c, r, inA) {
  const btn = document.getElementById("rcdToggle"),
    panel = document.getElementById("rcdPanel"),
    status = document.getElementById("rcdStatus");
  if (!btn || !panel) return null;
  const options = residualOptions(s, f, c, r, inA);
  const supported = options.length > 0;
  const integratedAuto =
    s.brand === "ABB" &&
    s.series === "Tmax XT" &&
    r.residualCurrent &&
    r.residualCurrent.kind === "integrated";
  if (integratedAuto && supported) {
    const option = options[0],
      sensitivities = residualValues(option.sensitivities, f, inA),
      types = residualValues(option.types, f, inA),
      delays = residualValues(option.delays, f, inA);
    st.rcdEnabled = true;
    st.rcdIntegratedAuto = true;
    st.rcdDevice = 0;
    if (st.rcdSensitivity >= sensitivities.length) st.rcdSensitivity = 0;
    if (st.rcdType >= types.length) st.rcdType = 0;
    if (st.rcdDelay >= delays.length) st.rcdDelay = 0;
    btn.disabled = true;
    btn.style.opacity = "0.45";
    btn.style.cursor = "not-allowed";
    btn.textContent = "Fejlstrømsbeskyttelse integreret i relæ";
    if (status) {
      status.classList.remove("hidden");
      status.innerHTML =
        "<strong>Fejlstrømsbeskyttelse</strong><br>Fejlstrømsbeskyttelse integreret i valgt relæ";
    }
    panel.classList.remove("hidden");
    setWrap("rcdSensitivityWrap", sensitivities.length > 0);
    setWrap("rcdTypeWrap", types.length > 0);
    setWrap("rcdDelayWrap", delays.length > 0);
    fillIdx("rcdDevice", [option.device], 0);
    fillIdx("rcdSensitivity", sensitivities, st.rcdSensitivity);
    fillIdx("rcdType", types, st.rcdType);
    fillIdx("rcdDelay", delays, st.rcdDelay);
    return {
      kind: option.kind || "integrated",
      device: option.device,
      sensitivity: sensitivities[st.rcdSensitivity],
      type: types[st.rcdType],
      delay: delays[st.rcdDelay],
      sourceNote: option.sourceNote,
    };
  }
  if (st.rcdIntegratedAuto) resetResidual();
  btn.disabled = !supported;
  btn.style.opacity = supported ? "1" : "0.45";
  btn.style.cursor = supported ? "pointer" : "not-allowed";
  btn.textContent = st.rcdEnabled
    ? "Fjern fejlstrømsbeskyttelse"
    : "Tilføj fejlstrømsbeskyttelse";
  if (status) {
    status.classList.remove("hidden");
    status.innerHTML = supported
      ? `<strong>Fejlstrømsbeskyttelse</strong><br>${st.rcdEnabled ? "Fejlstrømsbeskyttelse aktiv" : "Fejlstrømsbeskyttelse ikke valgt"}`
      : "<strong>Fejlstrømsbeskyttelse</strong><br>Ikke understøttet for valgt bryder/relæ";
  }
  if (!supported) {
    resetResidual();
    panel.classList.add("hidden");
    ["rcdDevice", "rcdSensitivity", "rcdType", "rcdDelay"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    });
    return null;
  }
  if (st.rcdDevice >= options.length) st.rcdDevice = 0;
  panel.classList.toggle("hidden", !st.rcdEnabled);
  if (!st.rcdEnabled) return null;
  fillIdx(
    "rcdDevice",
    options.map((o) => o.device),
    st.rcdDevice,
  );
  const option = options[st.rcdDevice] || options[0],
    sensitivities = residualValues(option.sensitivities, f, inA),
    types = residualValues(option.types, f, inA),
    delays = residualValues(option.delays, f, inA);
  if (st.rcdSensitivity >= sensitivities.length) st.rcdSensitivity = 0;
  if (st.rcdType >= types.length) st.rcdType = 0;
  if (st.rcdDelay >= delays.length) st.rcdDelay = 0;
  setWrap("rcdSensitivityWrap", sensitivities.length > 0);
  setWrap("rcdTypeWrap", types.length > 0);
  setWrap("rcdDelayWrap", delays.length > 0);
  fillIdx("rcdSensitivity", sensitivities, st.rcdSensitivity);
  fillIdx("rcdType", types, st.rcdType);
  fillIdx("rcdDelay", delays, st.rcdDelay);
  return {
    kind: option.kind || "integrated",
    device: option.device,
    sensitivity: sensitivities[st.rcdSensitivity],
    type: types[st.rcdType],
    delay: delays[st.rcdDelay],
    sourceNote: option.sourceNote,
  };
}

function labelsFor(s) {
  if (s.brand === "ABB")
    return { overload: "L", short: "S", instant: "I", magnetic: "I" };
  return { overload: "Ir", short: "Isd", instant: "Ii", magnetic: "Ii" };
}
function deviceLabel(s) {
  return (s.brand === "Schneider Electric" && s.series === "MasterPact MTZ") ||
    (s.brand === "Siemens" && (s.series === "3WA" || s.series === "3WL"))
    ? "Luftafbryder"
    : "Maksimalafbryder";
}

const BACKUP_415V = {};
const SCHNEIDER_BACKUP_415_TABLES = [
  {
    "source": "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, p. A-194, table \"Cascading - Upstream: ComPacT NSXm, NSX100 - Ue: 380-415 V AC\".",
    "columns": [
      {
        "series": "ComPacT NSXm",
        "frames": [
          "NSXm63",
          "NSXm160"
        ],
        "cls": "E"
      },
      {
        "series": "ComPacT NSXm",
        "frames": [
          "NSXm63",
          "NSXm160"
        ],
        "cls": "B"
      },
      {
        "series": "ComPacT NSXm",
        "frames": [
          "NSXm63",
          "NSXm160"
        ],
        "cls": "F"
      },
      {
        "series": "ComPacT NSXm",
        "frames": [
          "NSXm63",
          "NSXm160"
        ],
        "cls": "N"
      },
      {
        "series": "ComPacT NSXm",
        "frames": [
          "NSXm63",
          "NSXm160"
        ],
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "B"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX100",
        "cls": "L"
      }
    ],
    "rows": [
      [
        "iC40",
        "2-40",
        "6/4500",
        [
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          null
        ]
      ],
      [
        "iC40N",
        "2-16",
        "10/6000",
        [
          "16",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iCV40N",
        "6-16",
        "6000",
        [
          "16",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          null
        ]
      ],
      [
        "iC40H / iCV40H",
        "6-16",
        "10000",
        [
          "16",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60N",
        "0.5-40",
        "10",
        [
          "16",
          "20",
          "25",
          "30",
          "30",
          "20",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60H",
        "0.5-40",
        "15",
        [
          "16",
          "25",
          "36",
          "36",
          "36",
          "25",
          "36",
          "40",
          "40",
          "40",
          null
        ]
      ],
      [
        "iC60L",
        "0.5-25",
        "25",
        [
          null,
          null,
          "36",
          "36",
          "36",
          null,
          "36",
          "40",
          "40",
          "40",
          "40"
        ]
      ],
      [
        "iC60 RCBO 2P/3P 400V",
        "10-32",
        "6000",
        [
          "16",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60 RCBO 2P/3P (PN) 230V",
        "10-32",
        "10000",
        [
          "16",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60N RCBO (VD)",
        "6-20",
        "6000",
        [
          "16",
          "20",
          "25",
          "30",
          "30",
          "20",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60H RCBO (VD)",
        "6-20",
        "10000",
        [
          "16",
          "25",
          "36",
          "36",
          "36",
          "25",
          "36",
          "40",
          "40",
          "40",
          "40"
        ]
      ],
      [
        "iC60H2 RCBO (VD)",
        "10-20",
        "10000",
        [
          "16",
          "25",
          "36",
          "36",
          "36",
          "25",
          "36",
          "40",
          "40",
          "40",
          "40"
        ]
      ],
      [
        "C120N",
        "63-125",
        "10",
        [
          "16",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          null
        ]
      ],
      [
        "C120H",
        "63-125",
        "15",
        [
          "16",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25"
        ]
      ],
      [
        "NG125N",
        "10-125",
        "25",
        [
          null,
          null,
          "36",
          "36",
          "36",
          null,
          "36",
          "36",
          "36",
          "50",
          null
        ]
      ],
      [
        "NG125H",
        "10-125",
        "36",
        [
          null,
          null,
          null,
          "40",
          "50",
          null,
          null,
          "40",
          "50",
          "70",
          "100"
        ]
      ],
      [
        "NG125L",
        "10-80",
        "50",
        [
          null,
          null,
          null,
          null,
          "70",
          null,
          null,
          null,
          "70",
          "100",
          null
        ]
      ],
      [
        "NSXm E",
        "16-160",
        "16",
        [
          null,
          "25",
          "30",
          "30",
          "30",
          "25",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "NSXm B",
        "16-160",
        "25",
        [
          null,
          null,
          "36",
          "36",
          "50",
          null,
          "36",
          "36",
          "50",
          "50",
          null
        ]
      ],
      [
        "NSXm F",
        "16-160",
        "36",
        [
          null,
          null,
          null,
          "50",
          "70",
          null,
          null,
          "50",
          "70",
          "70",
          "70"
        ]
      ],
      [
        "NSXm N",
        "16-160",
        "50",
        [
          null,
          null,
          null,
          null,
          "70",
          null,
          null,
          null,
          "70",
          "70",
          null
        ]
      ],
      [
        "NSX100 B",
        "16-100",
        "25",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          "36",
          "36",
          "50",
          "50",
          null
        ]
      ],
      [
        "NSX100 F",
        "16-100",
        "36",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "50",
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX100 N",
        "16-100",
        "50",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX100 H",
        "16-100",
        "70",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "100",
          "150"
        ]
      ]
    ]
  },
  {
    "source": "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, p. A-195, table \"Cascading - Upstream: ComPacT NSX160, NSX250 - Ue: 380-415 V AC\".",
    "columns": [
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "B"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "L"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "B"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "L"
      }
    ],
    "rows": [
      [
        "iC40",
        "2-40",
        "6/4500",
        [
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          "10",
          null
        ]
      ],
      [
        "iC40N",
        "2-16",
        "10/6000",
        [
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iCV40N",
        "6-16",
        "6000",
        [
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          null
        ]
      ],
      [
        "iC40H",
        "6-16",
        "10000",
        [
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60N",
        "0.5-40",
        "10",
        [
          "20",
          "25",
          "30",
          "30",
          "30",
          "30",
          "20",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60H",
        "0.5-40",
        "15",
        [
          "25",
          "36",
          "40",
          "40",
          "40",
          "40",
          "25",
          "30",
          "30",
          "30",
          "30",
          null
        ]
      ],
      [
        "iC60L",
        "0.5-25",
        "25",
        [
          "25",
          "36",
          "40",
          "40",
          "40",
          "40",
          "25",
          "30",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60 RCBO 2P/3P 400V",
        "10-20",
        "6000",
        [
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60 RCBO 2P/3P (PN) 230V",
        "10-20",
        "10000",
        [
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20",
          "20"
        ]
      ],
      [
        "iC60N RCBO (VD)",
        "6-20",
        "6000",
        [
          "20",
          "25",
          "30",
          "30",
          "30",
          "30",
          "20",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60H RCBO (VD)",
        "6-20",
        "10000",
        [
          "25",
          "36",
          "40",
          "40",
          "40",
          "40",
          "25",
          "30",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "iC60H2 RCBO (VD)",
        "6-20",
        "10000",
        [
          "25",
          "36",
          "40",
          "40",
          "40",
          "40",
          "25",
          "30",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "C120N",
        "63-125",
        "10",
        [
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25"
        ]
      ],
      [
        "C120H",
        "63-125",
        "15",
        [
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25",
          "25"
        ]
      ],
      [
        "NG125N",
        "10-125",
        "25",
        [
          null,
          "36",
          "36",
          "36",
          "50",
          "70",
          null,
          "36",
          "36",
          "36",
          "50",
          "70"
        ]
      ],
      [
        "NG125H",
        "10-125",
        "36",
        [
          null,
          null,
          "40",
          "50",
          "70",
          "100",
          null,
          null,
          "40",
          "50",
          "70",
          "100"
        ]
      ],
      [
        "NG125L",
        "10-80",
        "50",
        [
          null,
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          null,
          "50",
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSXm E",
        "16-160",
        "16",
        [
          "25",
          "25",
          "30",
          "30",
          "30",
          "30",
          "25",
          "25",
          "30",
          "30",
          "30",
          "30"
        ]
      ],
      [
        "NSXm B",
        "16-160",
        "25",
        [
          null,
          "36",
          "36",
          "50",
          "50",
          "50",
          null,
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSXm F",
        "16-160",
        "36",
        [
          null,
          null,
          "50",
          "70",
          "70",
          "70",
          null,
          null,
          "50",
          "70",
          "70",
          "70"
        ]
      ],
      [
        "NSXm N",
        "16-160",
        "50",
        [
          null,
          null,
          null,
          "70",
          "70",
          "70",
          null,
          null,
          null,
          "70",
          "70",
          "70"
        ]
      ],
      [
        "NSX100 B",
        "16-100",
        "25",
        [
          null,
          "36",
          "36",
          "50",
          "50",
          "50",
          null,
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSX100 F",
        "16-100",
        "36",
        [
          null,
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          null,
          "50",
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX100 N",
        "16-100",
        "50",
        [
          null,
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX100 H",
        "16-100",
        "70",
        [
          null,
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          null,
          "100",
          "150"
        ]
      ],
      [
        "NSX100 S",
        "16-100",
        "100",
        [
          null,
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          null,
          "150"
        ]
      ]
    ]
  },
  {
    "source": "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, p. A-196, table \"Cascading - Upstream: ComPacT NSX160, NSX250, NSX400, NSX630 - Ue: 380-415 V AC\".",
    "columns": [
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "B"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX160",
        "cls": "L"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "B"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX250",
        "cls": "L"
      }
    ],
    "rows": [
      [
        "NSX160 B",
        "16-160",
        "25",
        [
          null,
          "36",
          "36",
          "50",
          "50",
          "50",
          null,
          "36",
          "36",
          "50",
          "50",
          null
        ]
      ],
      [
        "NSX160 F",
        "16-160",
        "36",
        [
          null,
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          null,
          "50",
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX160 N",
        "16-160",
        "50",
        [
          null,
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          null,
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX160 H",
        "16-160",
        "70",
        [
          null,
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          null,
          "100",
          "150"
        ]
      ],
      [
        "NSX160 S",
        "16-160",
        "100",
        [
          null,
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX250 B",
        "16-250",
        "25",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSX250 F",
        "16-250",
        "36",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "50",
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX250 N",
        "16-250",
        "50",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX250 H",
        "16-250",
        "70",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "100",
          null
        ]
      ],
      [
        "NSX250 S",
        "16-250",
        "100",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "150"
        ]
      ]
    ]
  },
  {
    "source": "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, p. A-196, table \"Cascading - Upstream: ComPacT NSX400, NSX630 - Ue: 380-415 V AC\".",
    "columns": [
      {
        "series": "ComPacT NSX",
        "frame": "NSX400",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX400",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX400",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX400",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX400",
        "cls": "L"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX630",
        "cls": "F"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX630",
        "cls": "N"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX630",
        "cls": "H"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX630",
        "cls": "S"
      },
      {
        "series": "ComPacT NSX",
        "frame": "NSX630",
        "cls": "L"
      }
    ],
    "rows": [
      [
        "NSXm E",
        "16-160",
        "16",
        [
          "25",
          "30",
          "30",
          "30",
          "30",
          "25",
          "30",
          "30",
          "30",
          null
        ]
      ],
      [
        "NSXm B",
        "16-160",
        "25",
        [
          "36",
          "36",
          "50",
          "50",
          "50",
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSXm F",
        "16-160",
        "36",
        [
          null,
          "50",
          "70",
          "70",
          "70",
          null,
          "50",
          "70",
          "70",
          null
        ]
      ],
      [
        "NSXm N",
        "16-160",
        "50",
        [
          null,
          null,
          "70",
          "70",
          "70",
          null,
          null,
          "70",
          "70",
          "70"
        ]
      ],
      [
        "NSX100 B",
        "16-100",
        "25",
        [
          "36",
          "36",
          "50",
          "50",
          "50",
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSX100 F",
        "16-100",
        "36",
        [
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          "50",
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX100 N",
        "16-100",
        "50",
        [
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX100 H",
        "16-100",
        "70",
        [
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          "100",
          null
        ]
      ],
      [
        "NSX100 S",
        "16-100",
        "100",
        [
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          "150"
        ]
      ],
      [
        "NSX160 B",
        "16-160",
        "25",
        [
          "36",
          "36",
          "50",
          "50",
          "50",
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSX160 F",
        "16-160",
        "36",
        [
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          "50",
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX160 N",
        "16-160",
        "50",
        [
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX160 H",
        "16-160",
        "70",
        [
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          "100",
          null
        ]
      ],
      [
        "NSX160 S",
        "16-160",
        "100",
        [
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          "150"
        ]
      ],
      [
        "NSX250 B",
        "16-250",
        "25",
        [
          "36",
          "36",
          "50",
          "50",
          "50",
          "36",
          "36",
          "50",
          "50",
          "50"
        ]
      ],
      [
        "NSX250 F",
        "16-250",
        "36",
        [
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          "50",
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX250 N",
        "16-250",
        "50",
        [
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX250 H",
        "16-250",
        "70",
        [
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          "100",
          null
        ]
      ],
      [
        "NSX250 S",
        "16-250",
        "100",
        [
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          "150"
        ]
      ],
      [
        "NSX400 F",
        "250-400",
        "36",
        [
          null,
          "50",
          "70",
          "100",
          "150",
          null,
          "50",
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX400 N",
        "250-400",
        "50",
        [
          null,
          null,
          "70",
          "100",
          "150",
          null,
          null,
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX400 H",
        "250-400",
        "70",
        [
          null,
          null,
          null,
          "100",
          "150",
          null,
          null,
          null,
          "100",
          "150"
        ]
      ],
      [
        "NSX400 S",
        "250-400",
        "100",
        [
          null,
          null,
          null,
          null,
          "150",
          null,
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX630 F",
        "250-630",
        "36",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          "50",
          "70",
          "100",
          null
        ]
      ],
      [
        "NSX630 N",
        "250-630",
        "50",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "70",
          "100",
          "150"
        ]
      ],
      [
        "NSX630 H",
        "250-630",
        "70",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "100",
          null
        ]
      ],
      [
        "NSX630 S",
        "250-630",
        "100",
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "150"
        ]
      ]
    ]
  },
  {
    "source": "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, p. A-197, table \"Cascading - Upstream: ComPacT NS630b-1600, ComPacT NS1600-3200, MasterPacT MTZ - Ue: 380-415 V AC\".",
    "columns": [
      {
        "series": "ComPacT NS",
        "frames": [
          "NS630b",
          "NS800",
          "NS1000",
          "NS1250",
          "NS1600"
        ],
        "cls": "N"
      },
      {
        "series": "ComPacT NS",
        "frames": [
          "NS630b",
          "NS800",
          "NS1000",
          "NS1250",
          "NS1600"
        ],
        "cls": "H"
      },
      {
        "series": "ComPacT NS",
        "frames": [
          "NS630b",
          "NS800",
          "NS1000",
          "NS1250",
          "NS1600"
        ],
        "cls": "L"
      },
      {
        "series": "ComPacT NS",
        "frames": [
          "NS630b",
          "NS800",
          "NS1000",
          "NS1250",
          "NS1600"
        ],
        "cls": "LB"
      },
      {
        "series": "ComPacT NS",
        "frames": [
          "NS2000",
          "NS2500",
          "NS3200"
        ],
        "cls": "N"
      },
      {
        "series": "ComPacT NS",
        "frames": [
          "NS2000",
          "NS2500",
          "NS3200"
        ],
        "cls": "H"
      },
      {
        "series": "MasterPact MTZ",
        "frame": "MTZ1",
        "cls": "L1"
      },
      {
        "series": "MasterPact MTZ",
        "frame": "MTZ2",
        "cls": "L1"
      }
    ],
    "rows": [
      [
        "NSX100 B",
        "16-100",
        "25",
        [
          "50",
          "50",
          "50",
          "50",
          null,
          null,
          "50",
          null
        ]
      ],
      [
        "NSX100 F",
        "16-100",
        "36",
        [
          "50",
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX100 N",
        "16-100",
        "50",
        [
          null,
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX100 H",
        "16-100",
        "70",
        [
          null,
          null,
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX100 S",
        "16-100",
        "100",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX100 L",
        "16-100",
        "150",
        [
          null,
          null,
          null,
          "200",
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX160 B",
        "16-160",
        "25",
        [
          "50",
          "50",
          "50",
          "50",
          null,
          null,
          "50",
          null
        ]
      ],
      [
        "NSX160 F",
        "16-160",
        "36",
        [
          "50",
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX160 N",
        "16-160",
        "50",
        [
          null,
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX160 H",
        "16-160",
        "70",
        [
          null,
          null,
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX160 S",
        "16-160",
        "100",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX160 L",
        "16-160",
        "150",
        [
          null,
          null,
          null,
          "200",
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX250 B",
        "16-250",
        "25",
        [
          "50",
          "50",
          "50",
          "50",
          null,
          null,
          "50",
          null
        ]
      ],
      [
        "NSX250 F",
        "16-250",
        "36",
        [
          "50",
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX250 N",
        "16-250",
        "50",
        [
          null,
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX250 H",
        "16-250",
        "70",
        [
          null,
          null,
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX250 S",
        "16-250",
        "100",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX250 L",
        "16-250",
        "150",
        [
          null,
          null,
          null,
          "200",
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX400 F",
        "250-400",
        "36",
        [
          "50",
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX400 N",
        "250-400",
        "50",
        [
          null,
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX400 H",
        "250-400",
        "70",
        [
          null,
          null,
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX400 S",
        "250-400",
        "100",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX400 L",
        "250-400",
        "150",
        [
          null,
          null,
          null,
          "200",
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NSX630 F",
        "250-630",
        "36",
        [
          "50",
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX630 N",
        "250-630",
        "50",
        [
          null,
          "70",
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX630 H",
        "250-630",
        "70",
        [
          null,
          null,
          "150",
          "150",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX630 S",
        "250-630",
        "100",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ],
      [
        "NSX630 L",
        "250-630",
        "150",
        [
          null,
          null,
          null,
          "200",
          null,
          null,
          null,
          null
        ]
      ],
      [
        "NS630b-1600 N",
        "630-1600",
        "50",
        [
          null,
          "70",
          "150",
          "200",
          "70",
          "70",
          "150",
          null
        ]
      ],
      [
        "NS630b-1600 H",
        "630-1600",
        "70",
        [
          null,
          null,
          "150",
          "200",
          null,
          null,
          "150",
          null
        ]
      ]
    ]
  }
];
const ABB_BACKUP_SOURCE =
  'ABB Electrical installation solutions for buildings - Technical details, 9AKK107991A8329, section "Coordination tables: back-up", p. 1/51 and table "MCCB - MCB @ 415 V", p. 1/81.';
const SIEMENS_BACKUP_SOURCE =
  'Siemens SENTRON Back-up protection, 3VA Molded Case Circuit Breakers, Edition 10/2017, tables "1.2) 3VA2 - 5SY", "1.4) 3VA2 - 5SL" and "1.6) 3VA2 - 5SU1", pp. 4, 5, 7 and 9.';
function addBackupRow(rows, downstream, rating, icu, cascading, enhanced = NOT_DOCUMENTED) {
  if (!cascading || cascading === V) return;
  rows.push([downstream, rating, icu, cascading, enhanced]);
}
function backupRowsForColumn(tableRows, colIndex) {
  const rows = [];
  tableRows.forEach((table) => {
    table.rows.forEach((row) => {
      const value = row.values[colIndex];
      if (value !== null && value !== undefined) {
        addBackupRow(rows, table.downstream, row.rating, table.icu, String(value));
      }
    });
  });
  return rows;
}
function registerBackupRows(brand, series, frame, cls, rating, source, rows) {
  if (!rows.length) return;
  const key = `${brand}|${series}|${frame}|${cls}|${rating}`;
  if (!BACKUP_415V[key]) {
    BACKUP_415V[key] = { source, rows: [] };
  } else if (!BACKUP_415V[key].source.includes(source)) {
    BACKUP_415V[key].source += `; ${source}`;
  }
  BACKUP_415V[key].rows.push(...rows);
}
function schneiderSeries(series) {
  return DATA.find(
    (item) => item.brand === "Schneider Electric" && item.series === series,
  );
}
function schneiderRatings(column, frame) {
  const series = schneiderSeries(column.series),
    found = series && series.frames.find((item) => item.frame === frame);
  if (!found) return [];
  const relayRatings = series.relays.flatMap((relay) =>
    relay.ratingsByFrame && relay.ratingsByFrame[frame]
      ? relay.ratingsByFrame[frame]
      : [],
  );
  return uniq([...found.ratings, ...relayRatings]).sort((a, b) => Number(a) - Number(b));
}
function normalizeSchneiderIcuIcn(value) {
  const raw = String(value ?? "").trim();
  if (raw === "4500") return "4,5";
  if (raw === "6000") return "6";
  if (raw === "10000") return "10";
  return raw.replace(/4500/g, "4,5").replace(/6000/g, "6");
}
function registerSchneiderBackupTable(table) {
  const rowsByColumn = table.columns.map(() => []);
  table.rows.forEach(([downstream, rating, icu, values]) => {
    values.forEach((value, colIndex) => {
      if (value === null || value === undefined || value === V) return;
      addBackupRow(
        rowsByColumn[colIndex],
        downstream,
        rating,
        normalizeSchneiderIcuIcn(icu),
        String(value).trim(),
      );
    });
  });
  table.columns.forEach((column, colIndex) => {
    const frames = column.frames || [column.frame];
    frames.forEach((frame) => {
      schneiderRatings(column, frame).forEach((rating) => {
        registerBackupRows(
          "Schneider Electric",
          column.series,
          frame,
          column.cls,
          rating,
          table.source,
          rowsByColumn[colIndex],
        );
      });
    });
  });
}
SCHNEIDER_BACKUP_415_TABLES.forEach(registerSchneiderBackupTable);

const ABB_TMAX_XT_BACKUP_COLUMNS = [
  { frame: "XT1", cls: "B" },
  { frame: "XT1", cls: "C" },
  { frame: "XT1", cls: "N" },
  { frame: "XT2", cls: "N" },
  { frame: "XT3", cls: "N" },
  { frame: "XT4", cls: "N" },
  { frame: "XT1", cls: "S" },
  { frame: "XT2", cls: "S" },
  { frame: "XT3", cls: "S" },
  { frame: "XT4", cls: "S" },
  { frame: "XT1", cls: "H" },
  { frame: "XT2", cls: "H" },
  { frame: "XT4", cls: "H" },
  { frame: "XT2", cls: "L" },
  { frame: "XT4", cls: "L" },
  { frame: "XT2", cls: "V" },
  { frame: "XT4", cls: "V" },
];
const ABB_TMAX_XT_RATINGS = {
  XT1: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160],
  XT2: [1.6, 2, 2.5, 3.2, 4, 5, 6.3, 8, 10, 12.5, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160],
  XT3: [63, 80, 100, 125, 160, 200, 250],
  XT4: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 225, 250],
};
const ABB_TMAX_XT_BACKUP_ROWS = [
  {
    downstream: "S200 B,C,K,Z",
    icu: "10",
    rows: [
      { rating: "0.5-10", values: [18, 25, 30, 36, 36, 36, 30, 36, 40, 40, 30, 40, 40, 40, 30, 40, 30] },
    ],
  },
  {
    downstream: "S200M B,C,D,K,Z",
    icu: "15",
    rows: [
      { rating: "0.5-10", values: [18, 25, 30, 36, 36, 36, 30, 50, 40, 40, 30, 50, 40, 50, 30, 50, 30] },
    ],
  },
  {
    downstream: "S200P B,C,D,K,Z",
    icu: "15",
    rows: [
      { rating: "32-63", values: [18, 25, 30, 36, 25, 36, 30, 50, 25, 40, 30, 50, 40, 50, 30, 50, 30] },
    ],
  },
  {
    downstream: "S800N B,C,D",
    icu: "36",
    rows: [
      { rating: "6-125", values: [null, null, null, null, null, null, 50, 50, 50, 50, 70, 70, 70, 120, 120, 150, 150] },
    ],
  },
  {
    downstream: "S800S B,C,D,K",
    icu: "50",
    rows: [
      { rating: "6-125", values: [null, null, null, null, null, null, null, null, null, null, 70, 70, 70, 120, 120, 150, 150] },
    ],
  },
  {
    downstream: "S800C B,C,D,K",
    icu: "25",
    rows: [
      { rating: "10-125", values: [null, null, 36, 36, 36, 36, 50, 50, 50, 50, 70, 70, 70, 120, 120, 150, 150] },
    ],
  },
];
ABB_TMAX_XT_BACKUP_COLUMNS.forEach((column, colIndex) => {
  const rows = backupRowsForColumn(ABB_TMAX_XT_BACKUP_ROWS, colIndex);
  (ABB_TMAX_XT_RATINGS[column.frame] || []).forEach((rating) => {
    registerBackupRows("ABB", "Tmax XT", column.frame, column.cls, rating, ABB_BACKUP_SOURCE, rows);
  });
});

const SIEMENS_3VA2_BACKUP_COLUMNS = [
  { frame: "3VA20 100", rating: 25 },
  { frame: "3VA20 100", rating: 40 },
  { frame: "3VA20 100", rating: 63 },
  { frame: "3VA20 100", rating: 100 },
  { frame: "3VA21 160", rating: 25 },
  { frame: "3VA21 160", rating: 40 },
  { frame: "3VA21 160", rating: 63 },
  { frame: "3VA21 160", rating: 100 },
  { frame: "3VA21 160", rating: 160 },
  { frame: "3VA22 250", rating: 160 },
  { frame: "3VA22 250", rating: 250 },
];
const SIEMENS_3VA2_BACKUP_ROWS = [
  {
    downstream: "5SY6 B/C",
    icu: "6/15",
    rows: [
      { rating: "0.3", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "0.5", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "1", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "1.6", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "2", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "3", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "4", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "5", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "6", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "8", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "10", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "13", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "15", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "16", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "20", values: [null, 55, 55, 55, null, 55, 55, 55, 55, 40, 40] },
      { rating: "25", values: [null, 55, 55, 55, null, 55, 55, 55, 55, 40, 40] },
      { rating: "30", values: [null, null, 55, 55, null, null, 55, 55, 55, 55, 40] },
      { rating: "32", values: [null, null, 55, 55, null, null, 55, 55, 55, 55, 40] },
      { rating: "40", values: [null, null, 35, 35, null, null, 35, 35, 35, 25, 25] },
      { rating: "50", values: [null, null, null, 35, null, null, null, 35, 35, 20, 20] },
      { rating: "63", values: [null, null, null, 20, null, null, null, 20, 20, 20, 20] },
    ],
  },
  {
    downstream: "5SY4 B/C",
    icu: "10/20",
    rows: [
      { rating: "0.3", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "0.5", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "1", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "1.6", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "2", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "2.5", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "3", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "3.5", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "4", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "5", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "6", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "8", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "10", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "13", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "15", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "16", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "20", values: [null, 60, 60, 60, null, 60, 60, 60, 60, 45, 45] },
      { rating: "25", values: [null, 60, 60, 60, null, 60, 60, 60, 60, 45, 45] },
      { rating: "30", values: [null, null, 60, 60, null, null, 60, 60, 60, 60, 45] },
      { rating: "32", values: [null, null, 60, 60, null, null, 60, 60, 60, 60, 45] },
      { rating: "35", values: [null, null, 40, 40, null, null, 40, 40, 40, 30, 30] },
      { rating: "40", values: [null, null, 40, 40, null, null, 40, 40, 40, 30, 30] },
      { rating: "45", values: [null, null, null, 40, null, null, null, 40, 40, 25, 25] },
      { rating: "50", values: [null, null, null, 40, null, null, null, 40, 40, 25, 25] },
      { rating: "60", values: [null, null, null, 25, null, null, null, 25, 25, 25, 25] },
      { rating: "63", values: [null, null, null, 25, null, null, null, 25, 25, 25, 25] },
    ],
  },
  {
    downstream: "5SY7 B/C",
    icu: "15/30",
    rows: [
      { rating: "0.3", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "0.5", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "1", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "1.6", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "2", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "3", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "4", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "6", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "8", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "10", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "13", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "16", values: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65] },
      { rating: "20", values: [null, 65, 65, 65, null, 65, 65, 65, 65, 50, 50] },
      { rating: "25", values: [null, 65, 65, 65, null, 65, 65, 65, 65, 50, 50] },
      { rating: "32", values: [null, null, 65, 65, null, null, 65, 65, 65, 65, 50] },
      { rating: "40", values: [null, null, 45, 45, null, null, 45, 45, 45, 35, 35] },
      { rating: "50", values: [null, null, null, 45, null, null, null, 45, 45, 30, 30] },
      { rating: "63", values: [null, null, null, 30, null, null, null, 30, 30, 30, 30] },
    ],
  },
  {
    downstream: "5SL4 B",
    icu: "10",
    rows: [
      { rating: "1", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "2", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "3", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "4", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "6", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "8", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "10", values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20] },
      { rating: "13", values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
      { rating: "16", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 30, 30] },
      { rating: "20", values: [null, 45, 45, 45, null, 45, 45, 45, 45, 40, 40] },
      { rating: "25", values: [null, 45, 45, 45, null, 45, 45, 45, 45, 45, 40] },
      { rating: "32", values: [null, null, 45, 45, null, null, 45, 45, 45, 45, 40] },
      { rating: "40", values: [null, null, 35, 35, null, null, 35, 35, 35, 25, 25] },
      { rating: "50", values: [null, null, null, 30, null, null, null, 30, 30, 20, 20] },
      { rating: "63", values: [null, null, null, 20, null, null, null, 20, 20, 20, 20] },
    ],
  },
  {
    downstream: "5SL4 C",
    icu: "10",
    rows: [
      { rating: "0.3", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "0.5", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "1", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "1.6", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "2", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "3", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "4", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "6", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "8", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "10", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "13", values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
      { rating: "16", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 30, 30] },
      { rating: "20", values: [null, 45, 45, 45, null, 45, 45, 45, 45, 40, 40] },
      { rating: "25", values: [null, 45, 45, 45, null, 45, 45, 45, 45, 45, 40] },
      { rating: "32", values: [null, null, 45, 45, null, null, 45, 45, 45, 45, 40] },
      { rating: "40", values: [null, null, 35, 35, null, null, 35, 35, 35, 25, 25] },
      { rating: "50", values: [null, null, null, 30, null, null, null, 30, 30, 20, 20] },
    ],
  },
  {
    downstream: "5SU1..4 B/C",
    icu: "10/20",
    rows: [
      { rating: "6", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "8", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "10", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "13", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "16", values: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60] },
      { rating: "20", values: [null, 60, 60, 60, null, 60, 60, 60, 60, 45, 45] },
      { rating: "25", values: [null, 60, 60, 60, null, 60, 60, 60, 60, 45, 45] },
      { rating: "32", values: [null, null, 60, 60, null, null, 60, 60, 60, 60, 45] },
      { rating: "40", values: [null, null, 40, 40, null, null, 40, 40, 40, 30, 30] },
    ],
  },
  {
    downstream: "5SU1..3 / 5SU1..6 B/C",
    icu: "4.5/6/15",
    rows: [
      { rating: "6", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "8", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "10", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "13", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "16", values: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55] },
      { rating: "20", values: [null, 55, 55, 55, null, 55, 55, 55, 55, 40, 40] },
      { rating: "25", values: [null, 55, 55, 55, null, 55, 55, 55, 55, 40, 40] },
      { rating: "32", values: [null, null, 55, 55, null, null, 55, 55, 55, 55, 40] },
    ],
  },
];
SIEMENS_3VA2_BACKUP_COLUMNS.forEach((column, colIndex) => {
  const rows = backupRowsForColumn(SIEMENS_3VA2_BACKUP_ROWS, colIndex);
  ["M", "H", "C", "L"].forEach((cls) => {
    registerBackupRows("Siemens", "3VA", column.frame, cls, column.rating, SIEMENS_BACKUP_SOURCE, rows);
  });
});

function splitBackupValue(value) {
  const raw = String(value ?? "").trim();
  if (!raw || raw === "-" || raw.toLowerCase().includes("verific"))
    return { cascading: raw || "-", enhanced: raw || "-" };
  if (raw.includes("/")) {
    const parts = raw
      .split("/")
      .map((x) => x.trim())
      .filter(Boolean);
    const cascade = parts.length ? parts[parts.length - 1] : raw;
    return { cascading: cascade + " kA", enhanced: raw };
  }
  return { cascading: raw.includes("kA") ? raw : raw + " kA", enhanced: raw };
}

function nsIrOptions(s, r, bases, desired) {
  if (!s.irSettingTypes || !r.name.includes("MicroLogic")) return [];
  const standard = s.irSettingTypes[0];
  const stdBest = best(bases, standard.ir, desired);
  if (!stdBest || stdBest.error) return [];
  const visible = [{ ...standard, best: stdBest }];
  if (st.method !== "Minimum settings") {
    for (const opt of s.irSettingTypes.slice(1)) {
      const b = best(bases, opt.ir, desired);
      if (!b.verify && !stdBest.verify && b.diff < stdBest.diff)
        visible.push({ ...opt, best: b });
    }
  }
  return visible;
}
function renderIrSettings(options) {
  const wrap = document.getElementById("irSettingWrap"),
    box = document.getElementById("irSettings");
  if (!wrap || !box) return;
  wrap.classList.toggle("hidden", !options.length);
  if (!options.length) {
    box.innerHTML = "";
    return;
  }
  if (!options.find((o) => o.id === st.irSetting)) st.irSetting = "standard";
  box.innerHTML = options
    .map(
      (o) =>
        `<button class="${o.id === st.irSetting ? "active" : ""}" data-ir-setting="${o.id}"><strong>${o.name}</strong><span>${o.typeNo || "Standard"} · In/Io ændres ikke</span><small>Forslag: Ir ${fmt(o.best.factor)} = ${fmtA(o.best.value)}</small></button>`,
    )
    .join("");
}
function componentGroup(name) {
  const n = String(name || "").toUpperCase();
  if (n.includes("IC40") || n.includes("ICV40")) return "iC40/iCV40";
  if (n.includes("IC60")) return "iC60";
  if (n.includes("NG125")) return "NG125";
  if (n.includes("C120")) return "C120";
  if (n.includes("NSXM")) return "ComPacT NSXm";
  if (n.includes("NSX")) return "ComPacT NSX";
  if (n.includes("NS630") || n.includes("NS800") || n.includes("NS1000") || n.includes("NS1600"))
    return "ComPacT NS";
  return name;
}
function renderBackup415V(s, f, c, inA) {
  const el = document.getElementById("backupPanel");
  if (!el) return;
  const select = document.getElementById("backupComponent");
  const noDataText =
    "Ingen producentverificerede backup-/cascadingdata indl\u00e6st for denne kombination";
  if (select) {
    st.backupComponent = select.value || "all";
  }
  const key = `${s.brand}|${s.series}|${f.frame}|${c[0]}|${inA}`;
  const data = BACKUP_415V[key];
  let selected = st.backupComponent || "all";
  const wanted = [];
  if (!data) {
    if (select) {
      select.value = "all";
      st.backupComponent = "all";
    }
    el.innerHTML = `<div class="backupEmpty">${noDataText}</div>`;
    return;
  }
  let rows = data.rows.map((r) => ({
    downstream: r[0],
    rating: r[1],
    icu: r[2],
    cascading: r[3],
    enhanced: r[4] || V,
    group: componentGroup(r[0]),
  }));
  const groups = uniq(rows.map((r) => r.group));
  if (select) {
    select.innerHTML =
      `<option value="all">Alle verificerede</option>` +
      groups.map((g) => `<option value="${g}">${g}</option>`).join("");
    if (selected !== "all" && !groups.includes(selected)) selected = "all";
    select.value = selected;
    st.backupComponent = selected;
  }
  if (selected !== "all") rows = rows.filter((r) => r.group === selected);
  if (!rows.length) {
    el.innerHTML = `<div class="backupEmpty">${noDataText}</div>`;
    return;
  }
  const withKa = (value) => {
    const raw = String(value ?? "").trim();
    if (!raw || raw === V || raw === NOT_DOCUMENTED) return V;
    return raw.toLowerCase().includes("ka") ? raw : `${raw} kA`;
  };
  const withAmpere = (value) => `${String(value).replace(/\./g, ",")}A`;
  const rowHtml = rows
    .map(
      (r) =>
        `<tr><td>${r.downstream}</td><td>${withAmpere(r.rating)}</td><td>${withKa(r.icu)}</td><td>${withKa(r.cascading)}</td><td>${withKa(r.enhanced)}</td></tr>`,
    )
    .join("");
  const missingGroups = (selected === "all" ? wanted : [selected]).filter(
    (g) => !data.rows.some((r) => componentGroup(r[0]) === g),
  );
  const missingHtml = missingGroups
    .map(
      (g) =>
        `<div class="backupMissing">${g}: 415V backup-/cascadingdata for valgt upstream: ${NOT_DOCUMENTED}.</div>`,
    )
    .join("");
  el.innerHTML = `<div class="backupNote">Backup / cascading at 415V according to EN/IEC 60947-2. Selectivity Enhanced by Cascading vises kun, hvor data er verificeret.</div>${rowHtml ? `<table class="backupTable"><thead><tr><th>Downstream</th><th>Rating</th><th>Icu/Icn</th><th>Cascading</th><th>Selectivity Enhanced by Cascading</th></tr></thead><tbody>${rowHtml}</tbody></table>` : ""}${missingHtml}<div class="backupSource">Kilde: ${data.source}</div>`;
}

function renderSelectors() {
  fill("brand", uniq(DATA.map((x) => x.brand)), st.brand);
  const series = DATA.filter((x) => x.brand === st.brand).map((x) => x.series);
  if (!series.includes(st.series)) st.series = series[0];
  fill("series", series, st.series);
  fillIdx(
    "frame",
    S().frames.map((x) => x.frame),
    st.frame,
  );
  fillIdx(
    "cls",
    F().classes.map((x) => `${x[0]} (${x[1]}kA)`),
    st.cls,
  );
  const rn = relays().map((x) => x.name);
  if (!rn.includes(st.relay)) st.relay = rn[0] || "";
  fill("relay", rn, st.relay);
  fillIdx("rating", ratings().map(fmtA), st.rating);
  fillIdx("poles", F().poles, st.poles);
}
const usageStats = (() => {
  const endpoint = "/api/stats";
  const idKey = "breakerSettingsAnonymousStatsId";
  let initialized = false;
  let lastCalculationSignature = "";

  function anonymousId() {
    try {
      let id = localStorage.getItem(idKey);
      if (!id) {
        const browserCrypto = globalThis.crypto;
        id =
          browserCrypto && browserCrypto.randomUUID
            ? browserCrypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        localStorage.setItem(idKey, id);
      }
      return id;
    } catch (_) {
      return "";
    }
  }

  function selection() {
    const s = S(),
      f = F(),
      r = R();
    return {
      brand: s.brand,
      series: s.series,
      frame: f.frame,
      relay: r.name,
      rcd: st.rcdEnabled ? "ja" : "nej",
    };
  }

  function calculationSignature() {
    return JSON.stringify({
      ...selection(),
      rating: rating(),
      poles: P(),
      desired: st.desired,
      ikmin: st.ikmin,
      ikmax: st.ikmax,
      inc: st.inc,
      method: st.method,
      irSetting: st.irSetting,
      backupComponent: st.backupComponent,
      rcdDevice: st.rcdDevice,
      rcdSensitivity: st.rcdSensitivity,
      rcdType: st.rcdType,
      rcdDelay: st.rcdDelay,
    });
  }

  function post(type) {
    const payload = JSON.stringify({
      type,
      version: "v6.23-test",
      anonymousId: anonymousId(),
      selection: selection(),
    });
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon(endpoint, blob)) return;
      }
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    } catch (_) {}
  }

  function trackCalculation() {
    const signature = calculationSignature();
    if (!initialized) {
      initialized = true;
      lastCalculationSignature = signature;
      return;
    }
    if (signature !== lastCalculationSignature) {
      lastCalculationSignature = signature;
      post("calculation");
    }
  }

  return {
    trackVisit: () => post("visit"),
    trackCalculation,
    trackDocumentation: () => post("documentation"),
  };
})();
function render() {
  renderSelectors();
  const s = S(),
    f = F(),
    c = C(),
    r = R(),
    inA = rating(),
    p = P(),
    desired = parseDk(st.desired),
    ikmin = parseDk(st.ikmin),
    ikmax = parseDk(st.ikmax),
    inc = parseDk(st.inc),
    name = `${f.frame}${c[0]} ${p}`;
  const lbl = labelsFor(s);
  ["desired", "ikmin", "ikmax", "inc"].forEach((id) => ($(id).value = st[id]));
  $("method").value = st.method;
  $("img").src = s.image;
  $("badge").textContent = s.status;
  $("badge").className = "badge " + s.statusClass;
  $("title").textContent = `${s.brand} · ${s.series}`;
  $("sub").textContent = `${name} · ${r.name} · In ${fmtA(inA)}`;
  $("chipFrame").textContent = "Bryder: " + f.frame;
  $("chipClass").textContent = "Icu: " + c[1] + " kA";
  $("chipRating").textContent = "In: " + fmtA(inA);
  $("chipPoles").textContent = "Poler: " + p;
  $("warning").classList.toggle("hidden", ikmax <= c[1]);
  $("warning").textContent =
    `OBS: Ik max (${fmt(ikmax)} kA) er højere end bryderens Icu (${c[1]} kA). Er bryderen backupbeskyttet?`;
  $("requestWarning").classList.add("hidden");
  $("requestWarning").textContent = "";
  const residual = renderResidualControls(s, f, c, r, inA);
  let rows = [],
    out = [
      `${deviceLabel(s)}:`,
      name,
      "",
      `${s.brand} / ${s.series}`,
      `Relæ: ${r.name} ${fmtA(inA)}`,
      "",
      "Indstilling:",
    ];
  const ioFactors = settingValues(r.io, f, inA),
    hasIo = ioFactors && ioFactors.length,
    bases = hasIo
      ? ioFactors.map((x) => Number((x * inA).toFixed(6)))
      : [inA];
  const trValues = settingValues(r.tr, f, inA);
  const isdValues = settingValues(r.isd, f, inA);
  const iiValues = settingValues(r.ii, f, inA);
  let irFactors = settingValues(r.ir, f, inA, [1]) || [1];
  let ir = best(bases, irFactors, desired);
  const irOpts = nsIrOptions(s, r, bases, desired);
  renderIrSettings(irOpts);
  if (irOpts.length) {
    if (!irOpts.find((o) => o.id === st.irSetting)) st.irSetting = "standard";
    const chosen = irOpts.find((o) => o.id === st.irSetting) || irOpts[0];
    irFactors = chosen.ir;
    ir = best(bases, irFactors, desired);
  }
  if (hasIo && !ir.verify && !ir.error) {
    rows.push(
      `<tr><td>Io</td><td>${range(bases, ir.base, fmtA)}</td><td>${fmtA(ir.base)}</td></tr>`,
    );
    out.push(`Io: ${fmtA(ir.base)}`);
  } else if (hasIo && ir.verify) {
    out.push("Io: " + (ir.status || V));
  }
  const ref = hasIo ? "Io" : "In";
  if (ir.verify) {
    const status = ir.status || V;
    rows.push(`<tr><td>${lbl.overload}</td><td>${status}</td><td>${status}</td></tr>`);
    out.push(lbl.overload + ": " + status);
  } else if (ir.error) {
    const msg = `Ønsket indstillingsstrøm ${fmtA(desired)} er lavere end lavest mulige ${lbl.overload} ${fmtA(ir.minValue)} for valgt relæstørrelse.`;
    $("requestWarning").classList.remove("hidden");
    $("requestWarning").textContent = msg;
    rows.push(
      `<tr><td>${lbl.overload}</td><td class="statusError">FEJL</td><td class="statusError">${msg}</td></tr>`,
    );
    out.push(`${lbl.overload}: FEJL - ${msg}`);
  } else {
    const min = Math.min(...bases) * Math.min(...irFactors);
    const msg =
      desired < min
        ? `Ønsket indstillingsstrøm ${fmtA(desired)} er lavere end lavest mulige ${lbl.overload} ${fmtA(min)} for valgt relæstørrelse.`
        : "";
    $("requestWarning").classList.toggle("hidden", !msg);
    $("requestWarning").textContent = msg;
    rows.push(
      `<tr><td>${lbl.overload}</td><td>${range(irFactors, ir.factor, fmt)}</td><td>${fmt(ir.factor)} × ${ref} = ${fmtA(ir.value)}</td></tr>`,
    );
    out.push(`${lbl.overload}: ${fmt(ir.factor)} × ${ref} = ${fmtA(ir.value)}`);
    if (msg) out.push("Bemærk: " + msg);
  }
  const overloadOk = ir && !ir.verify && !ir.error;
  if (r.trFixed) {
    rows.push(`<tr><td>tr</td><td>Fast</td><td>${r.trFixed}</td></tr>`);
    out.push("tr: " + r.trFixed);
  } else if (trValues && trValues.length) {
    if (!trValues.every(isN)) {
      const status = statusText(trValues);
      rows.push(`<tr><td>tr</td><td>${status}</td><td>${status}</td></tr>`);
      out.push("tr: " + status);
    } else {
      const tr = trValues[0];
      rows.push(
        `<tr><td>tr</td><td>${range(trValues, tr, (x) => x + "s")}</td><td>${tr}s</td></tr>`,
      );
      out.push("tr: " + tr + "s");
    }
  }
  if (isdValues && isdValues.length) {
    if (!isdValues.every(isN)) {
      const status = statusText(isdValues);
      rows.push(`<tr><td>${lbl.short}</td><td>${status}</td><td>${status}</td></tr>`);
      out.push(lbl.short + ": " + status);
    } else if (overloadOk) {
      const shortBaseName = r.isdBase === "In" ? "In" : lbl.overload;
      const shortBaseValue = r.isdBase === "In" ? inA : ir.value;
      const isd = under(isdValues, shortBaseValue, ikmin * 1000 * 0.8);
      if (isd.verify) {
        const status = isd.status || V;
        rows.push(`<tr><td>${lbl.short}</td><td>${status}</td><td>${status}</td></tr>`);
        out.push(lbl.short + ": " + status);
      } else if (isd.error) {
        rows.push(
          `<tr><td>${lbl.short}</td><td class="statusError">FEJL</td><td class="statusError">Laveste ${lbl.short} ${fmtA(isd.value)} er højere end grænse ${fmtA(isd.limit)}</td></tr>`,
        );
        out.push(
          `${lbl.short}: FEJL - laveste ${lbl.short} er højere end Ik min-grænse`,
        );
      } else {
        rows.push(
          `<tr><td>${lbl.short}</td><td>${range(isdValues, isd.factor, fmt)}</td><td>${fmt(isd.factor)} × ${shortBaseName} = ${fmtA(isd.value)}</td></tr>`,
        );
        out.push(
          `${lbl.short}: ${fmt(isd.factor)} × ${shortBaseName} = ${fmtA(isd.value)}`,
        );
      }
    }
  }
  let instantWritten = false;
  if (iiValues && iiValues.length) {
    const lim =
        isdValues && isdValues.length
          ? ikmax * 1000 * 0.8
          : ikmin * 1000 * 0.8,
      ii = under(iiValues, inA, lim);
    if (ii.verify) {
      const status = ii.status || V;
      rows.push(`<tr><td>${lbl.instant}</td><td>${status}</td><td>${status}</td></tr>`);
      out.push(lbl.instant + ": " + status);
      instantWritten = true;
    } else if (ii.error) {
      rows.push(
        `<tr><td>${lbl.instant}</td><td class="statusError">FEJL</td><td class="statusError">Laveste ${lbl.instant} ${fmtA(ii.value)} er højere end grænse ${fmtA(ii.limit)}</td></tr>`,
      );
      out.push(
        `${lbl.instant}: FEJL - laveste ${lbl.instant} er højere end grænse`,
      );
      instantWritten = true;
    } else {
      rows.push(
        `<tr><td>${lbl.instant}</td><td>${range(iiValues, ii.factor, fmt)}</td><td>${fmt(ii.factor)} × In = ${fmtA(ii.value)}</td></tr>`,
      );
      out.push(`${lbl.instant}: ${fmt(ii.factor)} × In = ${fmtA(ii.value)}`);
      instantWritten = true;
    }
  }
  if (r.iiByRating) {
    const txt = settingText(ratingSetting(r.iiByRating, f, inA), inA);
    if (txt) {
      rows.push(
        `<tr><td>${lbl.instant}</td><td>Fast/angivet</td><td>${txt}</td></tr>`,
      );
      out.push(lbl.instant + ": " + txt);
      instantWritten = true;
    }
  }
  if (r.imByRating) {
    const txt = settingText(ratingSetting(r.imByRating, f, inA) || V, inA);
    if (txt) {
      rows.push(
        `<tr><td>${lbl.magnetic}</td><td>Fast/angivet</td><td>${txt}</td></tr>`,
      );
      out.push(lbl.magnetic + ": " + txt);
      instantWritten = true;
    }
  }
  if (residual) {
    const kind = residual.kind === "module" ? "Separat modul" : "Integreret i relæ";
    rows.push(
      `<tr><td>Fejlstrøm</td><td>${kind}</td><td>${residual.device}</td></tr>`,
    );
    out.push("", "Fejlstrømsbeskyttelse:", `Modul eller relætype: ${residual.device}`);
    if (residual.sensitivity) {
      rows.push(
        `<tr><td>IΔn</td><td>Følsomhed</td><td>${residual.sensitivity}</td></tr>`,
      );
      out.push(`Følsomhed: ${residual.sensitivity}`);
    }
    if (residual.type) {
      rows.push(`<tr><td>Type</td><td>Fejlstrøm</td><td>${residual.type}</td></tr>`);
      out.push(`Type: ${residual.type}`);
    }
    if (residual.delay) {
      rows.push(
        `<tr><td>Δt</td><td>Forsinkelse</td><td>${residual.delay}</td></tr>`,
      );
      out.push(`Forsinkelse: ${residual.delay}`);
    }
  }
  rows.push(`<tr><td>INC</td><td>Manuel værdi</td><td>${fmtA(inc)}</td></tr>`);
  out.push("INC: " + fmtA(inc));
  $("rows").innerHTML = rows.join("");
  $("docs").innerHTML = s.docs
    .map(
      (d) =>
        `<a href="${d[1]}" target="_blank" rel="noreferrer">${d[0]}<span>Åbn</span></a>`,
    )
    .join("");
  $("output").textContent = out.join("\n");
  renderBackup415V(s, f, c, inA);
  usageStats.trackCalculation();
}
function reset(prevPole) {
  st.frame = 0;
  st.cls = 0;
  st.relay = "";
  st.rating = 0;
  const idx = F().poles.indexOf(prevPole);
  st.poles = idx >= 0 ? idx : 0;
  st.inc = String(F().ratings[F().ratings.length - 1]);
  resetResidual();
}
function bind() {
  $("brand").onchange = (e) => {
    const oldPole = P();
    st.brand = e.target.value;
    st.series = DATA.find((x) => x.brand === st.brand).series;
    reset(oldPole);
    render();
  };
  $("series").onchange = (e) => {
    const oldPole = P();
    st.series = e.target.value;
    reset(oldPole);
    render();
  };
  $("frame").onchange = (e) => {
    const oldPole = P();
    st.frame = +e.target.value;
    st.cls = 0;
    st.relay = "";
    st.rating = 0;
    resetResidual();
    const idx = F().poles.indexOf(oldPole);
    st.poles = idx >= 0 ? idx : 0;
    st.inc = String(F().ratings[F().ratings.length - 1]);
    render();
  };
  $("cls").onchange = (e) => {
    st.cls = +e.target.value;
    render();
  };
  $("relay").onchange = (e) => {
    st.relay = e.target.value;
    st.rating = 0;
    resetResidual();
    render();
  };
  $("rating").onchange = (e) => {
    st.rating = +e.target.value;
    st.inc = String(rating());
    render();
  };
  $("poles").onchange = (e) => {
    st.poles = +e.target.value;
    render();
  };
  ["desired", "ikmin", "ikmax", "inc"].forEach((id) => {
    $(id).oninput = (e) => (st[id] = e.target.value);
    $(id).onchange = render;
  });
  $("method").onchange = (e) => {
    st.method = e.target.value;
    render();
  };
  const bc = document.getElementById("backupComponent");
  if (bc)
    bc.onchange = (e) => {
      st.backupComponent = e.target.value;
      render();
    };
  const irBox = document.getElementById("irSettings");
  if (irBox)
    irBox.onclick = (e) => {
      const b = e.target.closest("button[data-ir-setting]");
      if (b) {
        st.irSetting = b.dataset.irSetting;
        render();
      }
    };
  const rcdToggle = document.getElementById("rcdToggle");
  if (rcdToggle)
    rcdToggle.onclick = () => {
      if (rcdToggle.disabled) return;
      st.rcdEnabled = !st.rcdEnabled;
      if (!st.rcdEnabled) {
        st.rcdDevice = 0;
        st.rcdSensitivity = 0;
        st.rcdType = 0;
        st.rcdDelay = 0;
      }
      render();
    };
  const rcdFields = {
    rcdDevice: "rcdDevice",
    rcdSensitivity: "rcdSensitivity",
    rcdType: "rcdType",
    rcdDelay: "rcdDelay",
  };
  Object.keys(rcdFields).forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.onchange = (e) => {
        st[rcdFields[id]] = +e.target.value;
        if (id === "rcdDevice") {
          st.rcdSensitivity = 0;
          st.rcdType = 0;
          st.rcdDelay = 0;
        }
        render();
      };
  });
  $("copy").onclick = async () => {
    await navigator.clipboard.writeText($("output").textContent);
    usageStats.trackDocumentation();
    $("copy").textContent = "Kopieret";
    setTimeout(() => ($("copy").textContent = "Kopiér"), 1200);
  };
}
usageStats.trackVisit();
bind();
render();
