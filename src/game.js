import kaboom from "kaboom";
import * as config from "./config";

const gameWidth = config.gameResolution[0] + 2 * config.levelMargin;
const gameHeight = config.gameResolution[1] + 2 * config.levelMargin;

export const k = kaboom({
  width: gameWidth,
  height: gameHeight,
  scale: 3,
  background: [0, 0, 0, 1],
  global: false,
  debug: true,
});

export default k;
