export default function inputManager(kaboomInst) {
  this.getAxisHoriz = () => {
    const minuxX =
      kaboomInst.isKeyDown("left") || kaboomInst.isKeyDown("a") ? -1 : 0;
    const plusX =
      kaboomInst.isKeyDown("right") || kaboomInst.isKeyDown("d") ? 1 : 0;
    return minuxX + plusX;
  };

  this.getAxisVert = () => {
    const minuxX =
      kaboomInst.isKeyDown("up") || kaboomInst.isKeyDown("w") ? 1 : 0;
    const plusX =
      kaboomInst.isKeyDown("down") || kaboomInst.isKeyDown("s") ? -1 : 0;
    return minuxX + plusX;
  };

  this.onJump = (callback) => {
    kaboomInst.onKeyPress("space", callback);
  };
}
