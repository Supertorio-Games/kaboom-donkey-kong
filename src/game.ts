import kaplay, { RGBAValue } from "kaplay";

/** Configure your Game Setup Here **/

// Game with and height are the resolution used in
// your game code. Actual canvas size is determined
// by the scale multiplier.
const GAME_WIDTH = 232;
const GAME_HEIGHT = 232;
const GAME_SCALE = 3;

const BACKGROUND_COLOR : RGBAValue = [0, 0, 0, 1];
const ROOT_ELEMENT_ID : string = "kaplay";
const DISABLE_ANTIALIAS : boolean = false;

const ENABLE_DEBUG = true;

/*************************************************************************/
export default kaplay({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scale: GAME_SCALE,
  background: BACKGROUND_COLOR,
  root: document.getElementById(ROOT_ELEMENT_ID) || undefined,
  global: false,
  stretch: false,
  debug: ENABLE_DEBUG,
  crisp: DISABLE_ANTIALIAS,
});
