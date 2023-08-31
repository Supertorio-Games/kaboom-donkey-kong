import type { KaboomCtx } from "kaboom";

export type InputManager = {
  getAxisHoriz: () => number;
  getAxisVert: () => number;
  onJump: (callback: () => void) => void;
  onHorizRelease: (callback: () => void) => void;
};

export default function inputManager(kaboomInst: KaboomCtx): InputManager {
  const getAxisHoriz = () => {
    const minuxX =
      kaboomInst.isKeyDown("left") || kaboomInst.isKeyDown("a") ? -1 : 0;
    const plusX =
      kaboomInst.isKeyDown("right") || kaboomInst.isKeyDown("d") ? 1 : 0;
    return minuxX + plusX;
  };

  const getAxisVert = () => {
    const minuxX =
      kaboomInst.isKeyDown("up") || kaboomInst.isKeyDown("w") ? 1 : 0;
    const plusX =
      kaboomInst.isKeyDown("down") || kaboomInst.isKeyDown("s") ? -1 : 0;
    return minuxX + plusX;
  };

  const onHorizRelease = (callback: () => void) => {
    kaboomInst.onKeyRelease("up", callback);
    kaboomInst.onKeyRelease("down", callback);
    kaboomInst.onKeyRelease("w", callback);
    kaboomInst.onKeyRelease("s", callback);
  };

  const onJump = (callback: () => void) => {
    kaboomInst.onKeyPress("space", callback);
  };

  return {
    getAxisHoriz,
    getAxisVert,
    onJump,
    onHorizRelease,
  };
}
