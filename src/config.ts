export const levelMargin = 20;
export const barrelSpawnDelay = 5;
export const titleFont = "unscii";
export const bodyFont = "unscii"

export type LevelPlatform = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  slope: number;
};

export type LevelLadder = {
  xPos: number;
  yMin: number;
  yMax: number;
};

export type LevelDefinition = {
  levelColor: [number, number, number];
  offsetTop: number;
  slopeAngle?: number;
  platforms: LevelPlatform[];
  ladders: LevelLadder[];
};

export type LevelConfig = {
  [key: string]: LevelDefinition;
};

export const levelConfig: LevelConfig = {
  level1: {
    levelColor: [181, 108, 224],
    offsetTop: 32,
    slopeAngle: 2,
    platforms: [
      { xMin: -4, xMax: 100, yMin: -2, yMax: 0, slope: 0 },
      { xMin: -4, xMax: 180, yMin: 25, yMax: 25, slope: 0 },
      { xMin: 12, xMax: 195, yMin: 45, yMax: 52, slope: 1 },
      { xMin: -4, xMax: 180, yMin: 73, yMax: 80, slope: -1 },
      { xMin: 12, xMax: 195, yMin: 101, yMax: 108, slope: 1 },
      { xMin: -4, xMax: 180, yMin: 129, yMax: 136, slope: -1 },
      { xMin: 0, xMax: 195, yMin: 158, yMax: 158, slope: 0 },
    ],
    ladders: [
      { xPos: 152, yMin: 136, yMax: 158 },
      { xPos: 96, yMin: 105, yMax: 134 },
      { xPos: 32, yMin: 108, yMax: 131 },
      { xPos: 112, yMin: 78, yMax: 105 },
      { xPos: 152, yMin: 80, yMax: 103 },
      { xPos: 72, yMin: 50, yMax: 77 },
      { xPos: 32, yMin: 52, yMax: 75 },
      { xPos: 152, yMin: 25, yMax: 47 },
      { xPos: 88, yMin: 0, yMax: 25 },
    ],
  },
  level2: {
    levelColor: [101, 111, 228],
    offsetTop: 50,
    platforms: [
      { xMin: 0, xMax: 195, yMin: 1, yMax: 1, slope: 0 },
      { xMin: 0, xMax: 195, yMin: 26, yMax: 26, slope: 0 },
      { xMin: 0, xMax: 195, yMin: 54, yMax: 54, slope: 0 },
      { xMin: 0, xMax: 195, yMin: 82, yMax: 82, slope: 0 },
      { xMin: 0, xMax: 195, yMin: 110, yMax: 110, slope: 0 },
      { xMin: 0, xMax: 195, yMin: 138, yMax: 138, slope: 0 }
    ],
    ladders: [
      { xPos: 16, yMin: 109, yMax: 138 },
      { xPos: 16, yMin: 82, yMax: 110 },
      { xPos: 16, yMin: 54, yMax: 82 },
      { xPos: 16, yMin: 26, yMax: 54 },
      { xPos: 16, yMin: 1, yMax: 26 },
      { xPos: 56, yMin: 109, yMax: 138 },
      { xPos: 56, yMin: 82, yMax: 110 },
      { xPos: 56, yMin: 54, yMax: 82 },
      { xPos: 56, yMin: 26, yMax: 54 },
      { xPos: 56, yMin: 1, yMax: 26 },
      { xPos: 128, yMin: 109, yMax: 138 },
      { xPos: 128, yMin: 82, yMax: 110 },
      { xPos: 128, yMin: 54, yMax: 82 },
      { xPos: 128, yMin: 26, yMax: 54 },
      { xPos: 128, yMin: 1, yMax: 26 },
      { xPos: 168, yMin: 109, yMax: 138 },
      { xPos: 168, yMin: 82, yMax: 110 },
      { xPos: 168, yMin: 54, yMax: 82 },
      { xPos: 168, yMin: 26, yMax: 54 },
      { xPos: 168, yMin: 1, yMax: 26 },
    ],
  },
};
