const VERIFY = "Skal verificeres";
const NOT_DOCUMENTED = "Ikke dokumenteret af producent";
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
  default: [VERIFY],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_IR,
};
const SIEMENS_3VA_ETU3_TR = {
  default: [VERIFY],
  ...keyed(SIEMENS_3VA2_ETU3_DEFAULT_KEYS, SIEMENS_3VA2_ETU3_TR_DEFAULT),
  "3VA22 250|250": [0.5, 0.75, 1, 2, 3, 5, 8, 10, 14, 15],
  "3VA24 630|630": [0.5, 0.75, 1, 2, 3, 5, 8, 10, 11, 12],
  ...keyed(SIEMENS_3VA_NOT_DOCUMENTED_KEYS, [NOT_DOCUMENTED]),
  "3VA27 1600": SIEMENS_3VA27_ETU3_TR,
};
const SIEMENS_3VA_ETU320_II = {
  default: [VERIFY],
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
  default: [VERIFY],
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

const DATA = [
  {
    brand: "Schneider Electric",
    series: "ComPacT NSX",
    image: "assets/schneider-nsx.svg",
    status: "Mostly verified",
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
      },
      {
        name: "MicroLogic 2.2",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [100, 160],
          NSX250: [250],
        },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        iiByRating: { 40: "600A", 100: "1500A", 160: "2400A", 250: "3000A" },
      },
      {
        name: "MicroLogic 5.2 E",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [100, 160],
          NSX250: [250],
        },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12, 15],
      },
      {
        name: "MicroLogic 6.2 E",
        frames: ["NSX100", "NSX160", "NSX250"],
        ratingsByFrame: {
          NSX100: [40, 100],
          NSX160: [100, 160],
          NSX250: [250],
        },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12, 15],
      },
      {
        name: "MicroLogic 2.3",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        iiByRating: { 400: "4800A", 630: "6930A" },
      },
      {
        name: "MicroLogic 5.3 E",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12],
      },
      {
        name: "MicroLogic 6.3 E",
        frames: ["NSX400", "NSX630"],
        ratingsByFrame: { NSX400: [400], NSX630: [630] },
        io: [0.4, 0.5, 0.63, 0.7, 0.8, 0.9, 1],
        ir: [0.9, 0.93, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 3, 4, 5, 6, 8, 10],
        ii: [1.5, 2, 3, 4, 6, 8, 10, 12],
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
    status: "Partial",
    statusClass: "partial",
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
        ir: [1],
        trFixed: "Skal verificeres",
        imByRating: {},
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
    status: "Partial",
    statusClass: "partial",
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
      },
      {
        name: "MicroLogic 5.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
      },
      {
        name: "MicroLogic 6.0",
        ir: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
        tr: [0.5, 1, 2, 4, 8, 12, 16, 20, 24],
        isd: [1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
        ii: [2, 3, 4, 6, 8, 10, 12, 15],
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
    ],
  },
  {
    brand: "Schneider Electric",
    series: "MasterPact MTZ",
    image: "assets/schneider-mtz.svg",
    status: "Partial",
    statusClass: "partial",
    frames: [
      {
        frame: "MTZ1 06",
        classes: [
          ["H1", 42],
          ["H2", 50],
          ["H3", 66],
          ["L1", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [630],
      },
      {
        frame: "MTZ1 10",
        classes: [
          ["H1", 42],
          ["H2", 50],
          ["H3", 66],
          ["L1", 150],
        ],
        poles: ["3P", "4P"],
        ratings: [1000],
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
    status: "ABB verified, setting details partial",
    statusClass: "partial",
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
        sourceNote:
          "ABB SACE Tmax XT IEC catalog 08/2024, pages 3/30-3/34 and 3/50. Ekip Hi-Touch L/tr/S/I steps verified per frame.",
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
    status: "Relay types verified",
    statusClass: "partial",
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
        sourceNote:
          "ABB Emax 2 Ekip Touch/Hi-Touch manual 1SDH001316R1002, standard protections table: L/tr/S/I steps verified.",
      },
      {
        name: "Ekip Hi-Touch",
        ir: ABB_TOUCH_L,
        tr: stepValues(3, 144, 1),
        isd: ABB_TOUCH_S,
        ii: ABB_TOUCH_I_XT7_EMAX,
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
    status: "Frames and ETU types verified, settings partial",
    statusClass: "partial",
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
    series: "3WL",
    image: "assets/siemens-3wl.svg",
    status: "Frames and ETU functions verified, settings partial",
    statusClass: "partial",
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
        ir: ["Skal verificeres"],
        tr: ["Skal verificeres"],
        isd: ["Skal verificeres"],
        ii: ["Skal verificeres"],
        functions: ["L", "N", "S", "I", "G optional"],
        sourceNote:
          "Siemens 3WL Air Circuit Breakers catalog 10/2014 verifies ETU76B ranges, but exact setting steps for L/tr/S/I are not listed in the available official table.",
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
function relays() {
  const f = F().frame;
  return S().relays.filter((r) => !r.frames || r.frames.includes(f));
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
  let out = null;
  for (const b of bases)
    for (const f of factors) {
      const value = b * f,
        diff = Math.abs(value - desired),
        score = diff * 10000 + b;
      if (!out || score < out.score)
        out = { base: b, factor: f, value, diff, score };
    }
  return out;
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
  if (!vals || !vals.length) return "Ikke relevant";
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

function labelsFor(s) {
  if (s.brand === "ABB")
    return { overload: "L", short: "S", instant: "I", magnetic: "I" };
  return { overload: "Ir", short: "Isd", instant: "Ii", magnetic: "Ii" };
}

const BACKUP_415V = {};
const SCHNEIDER_BACKUP_SOURCE =
  "Schneider Electric LVPED318033EN Selectivity, Cascading and Coordination Guide 2025, cascading table 380-415 V AC, upstream ComPacT NSX100.";
const NSX100_CASCADING = {
  B: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "20",
    iC60H: "25",
    iC60L25: V,
    iC60L40: "25",
    iC60L63: "25",
    NG125N: V,
    NG125H: V,
    NG125L: V,
  },
  F: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "25",
    iC60H: "36",
    iC60L25: "36",
    iC60L40: "36",
    iC60L63: "36",
    NG125N: "36",
    NG125H: V,
    NG125L: V,
  },
  N: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "30",
    iC60H: "40",
    iC60L25: "40",
    iC60L40: "40",
    iC60L63: "40",
    NG125N: "36",
    NG125H: "40",
    NG125L: V,
  },
  H: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "30",
    iC60H: "40",
    iC60L25: "40",
    iC60L40: "40",
    iC60L63: "40",
    NG125N: "36",
    NG125H: "50",
    NG125L: "70",
  },
  S: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "30",
    iC60H: "40",
    iC60L25: "40",
    iC60L40: "40",
    iC60L63: "40",
    NG125N: "50",
    NG125H: "70",
    NG125L: "100",
  },
  L: {
    iCV40N: "10",
    iC40N16: "20",
    iC40N40: "16",
    iC60N: "30",
    iC60H: "40",
    iC60L25: "40",
    iC60L40: "40",
    iC60L63: "40",
    NG125N: "70",
    NG125H: "100",
    NG125L: "150",
  },
};
function addBackupRow(rows, downstream, rating, icu, cascading) {
  if (!cascading || cascading === V) return;
  rows.push([downstream, rating, icu, cascading, V]);
}
function schneiderNsx100Rows(cls) {
  const d = NSX100_CASCADING[cls];
  if (!d) return [];
  const rows = [];
  addBackupRow(rows, "iCV40N", "6-40", "6", d.iCV40N);
  addBackupRow(rows, "iC40N", "2-16", "6/10", d.iC40N16);
  addBackupRow(rows, "iC40N", "20-40", "6/10", d.iC40N40);
  addBackupRow(rows, "iC60N", "0,5-40", "10", d.iC60N);
  addBackupRow(rows, "iC60N", "50-63", "10", d.iC60N);
  addBackupRow(rows, "iC60H", "0,5-40", "15", d.iC60H);
  addBackupRow(rows, "iC60H", "50-63", "15", d.iC60H);
  addBackupRow(rows, "iC60L", "0,5-25", "25", d.iC60L25);
  addBackupRow(rows, "iC60L", "32-40", "20", d.iC60L40);
  addBackupRow(rows, "iC60L", "50-63", "15", d.iC60L63);
  addBackupRow(rows, "NG125N", "1-125", "25", d.NG125N);
  addBackupRow(rows, "NG125H", "1-125", "36", d.NG125H);
  addBackupRow(rows, "NG125L", "1-80", "50", d.NG125L);
  return rows;
}
["B", "F", "N", "H", "S", "L"].forEach((cls) => {
  [16, 25, 40, 63, 80, 100].forEach((rt) => {
    BACKUP_415V[`Schneider Electric|ComPacT NSX|NSX100|${cls}|${rt}`] = {
      source: SCHNEIDER_BACKUP_SOURCE,
      rows: schneiderNsx100Rows(cls),
    };
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
  if (n.includes("IC60")) return "IC60";
  if (n.includes("NG125")) return "NG125";
  if (n.includes("IC40N")) return "IC40N";
  if (n.includes("ICV40N")) return "ICV40N";
  return n;
}
function renderBackup415V(s, f, c, inA) {
  const el = document.getElementById("backupPanel");
  if (!el) return;
  const select = document.getElementById("backupComponent");
  if (select) {
    st.backupComponent = select.value || "all";
  }
  const key = `${s.brand}|${s.series}|${f.frame}|${c[0]}|${inA}`;
  const data = BACKUP_415V[key];
  const selected = st.backupComponent || "all";
  const wanted = ["IC60", "NG125", "IC40N", "ICV40N"];
  if (!data) {
    el.innerHTML = `<div class="backupEmpty">Ingen verificerede backup-/cascadingdata indlæst for ${f.frame}${c[0]} In ${fmtA(inA)} ved 415V endnu.</div>`;
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
  if (selected !== "all") rows = rows.filter((r) => r.group === selected);
  const withKa = (value) => {
    const raw = String(value ?? "").trim();
    return raw && raw !== V ? `${raw} kA` : V;
  };
  const rowHtml = rows
    .map(
      (r) =>
        `<tr><td>${r.downstream}</td><td>${r.rating}A</td><td>${withKa(r.icu)}</td><td>${withKa(r.cascading)}</td><td>${r.enhanced}</td></tr>`,
    )
    .join("");
  const missingGroups = (selected === "all" ? wanted : [selected]).filter(
    (g) => !data.rows.some((r) => componentGroup(r[0]) === g),
  );
  const missingHtml = missingGroups
    .map(
      (g) =>
        `<div class="backupMissing">${g}: ingen verificerede 415V backup-/cascadingdata indlæst for valgt upstream endnu.</div>`,
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
function stats(type) {
  const raw = localStorage.getItem("breakerStats"),
    s = raw
      ? JSON.parse(raw)
      : { visits: 0, calculations: 0, copies: 0, series: {} };
  if (type === "visit") s.visits++;
  if (type === "calc") s.calculations++;
  if (type === "copy") s.copies++;
  s.series[S().series] = (s.series[S().series] || 0) + 1;
  localStorage.setItem("breakerStats", JSON.stringify(s));
  const top = Object.entries(s.series).sort((a, b) => b[1] - a[1])[0];
  $("stats").innerHTML =
    `<strong>Brug af appen</strong><br>Besøg: ${s.visits}<br>Beregninger: ${s.calculations}<br>Kopieringer: ${s.copies}<br>Mest brugte serie: ${top ? top[0] : "-"}`;
}
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
  let rows = [],
    out = [
      "Maksimalafbryder:",
      name,
      "",
      `${s.brand} / ${s.series}`,
      `Relæ: ${r.name} ${fmtA(inA)}`,
      "",
      "Indstilling:",
    ];
  const hasIo = r.io && r.io.length,
    bases = hasIo ? r.io.map((x) => x * inA) : [inA];
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
  if (hasIo && !ir.verify) {
    rows.push(
      `<tr><td>Io</td><td>${range(bases, ir.base, fmtA)}</td><td>${fmtA(ir.base)}</td></tr>`,
    );
    out.push(`Io: ${fmtA(ir.base)}`);
  } else if (hasIo && ir.verify) {
    out.push("Io: " + (ir.status || V));
  } else {
    out.push("Io: Ikke relevant");
  }
  const ref = hasIo ? "Io" : "In";
  if (ir.verify) {
    const status = ir.status || V;
    rows.push(`<tr><td>${lbl.overload}</td><td>${status}</td><td>${status}</td></tr>`);
    out.push(lbl.overload + ": " + status);
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
  } else {
    out.push("tr: Ikke relevant");
  }
  if (isdValues && isdValues.length) {
    if (!isdValues.every(isN)) {
      const status = statusText(isdValues);
      rows.push(`<tr><td>${lbl.short}</td><td>${status}</td><td>${status}</td></tr>`);
      out.push(lbl.short + ": " + status);
    } else if (!ir.verify) {
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
    } else {
      out.push(`${lbl.short}: Ikke relevant`);
    }
  } else {
    out.push(`${lbl.short}: Ikke relevant`);
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
  if (!instantWritten) out.push(`${lbl.instant}: Ikke relevant`);
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
  stats();
}
function reset(prevPole) {
  st.frame = 0;
  st.cls = 0;
  st.relay = "";
  st.rating = 0;
  const idx = F().poles.indexOf(prevPole);
  st.poles = idx >= 0 ? idx : 0;
  st.inc = String(F().ratings[F().ratings.length - 1]);
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
  $("copy").onclick = async () => {
    await navigator.clipboard.writeText($("output").textContent);
    stats("copy");
    $("copy").textContent = "Kopieret";
    setTimeout(() => ($("copy").textContent = "Kopiér"), 1200);
  };
}
stats("visit");
bind();
render();
