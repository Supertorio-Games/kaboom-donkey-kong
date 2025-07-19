import type { KAPLAYCtx } from "kaplay";

export type InputManager = {
  getAxisHoriz: () => number;
  getAxisVert: () => number;
  onJump: (callback: () => void) => void;
};

export default function inputManager(kaplayInst: KAPLAYCtx): InputManager {
  const getAxisHoriz = () => {
    const minuxX =
      kaplayInst.isKeyDown("left") || kaplayInst.isKeyDown("a") ? -1 : 0;
    const plusX =
      kaplayInst.isKeyDown("right") || kaplayInst.isKeyDown("d") ? 1 : 0;
    return minuxX + plusX;
  };

  const getAxisVert = () => {
    const minuxX =
      kaplayInst.isKeyDown("up") || kaplayInst.isKeyDown("w") ? 1 : 0;
    const plusX =
      kaplayInst.isKeyDown("down") || kaplayInst.isKeyDown("s") ? -1 : 0;
    return minuxX + plusX;
  };

  const onJump = (callback: () => void) => {
    kaplayInst.onKeyPress("space", callback);
  };

  return {
    getAxisHoriz,
    getAxisVert,
    onJump,
  };
}
