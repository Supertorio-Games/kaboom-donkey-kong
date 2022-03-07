export const gameResolution = [192, 192];
export const levelMargin = 20;
export const barrelSpawnDelay = 3;

export const levelConfig = {
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
  },
};
