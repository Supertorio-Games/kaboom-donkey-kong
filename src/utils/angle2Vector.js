import k from "../game";

const { vec2, deg2rad } = k;

export const angleToVec2 = (angle) => {
  const vx = Math.cos(deg2rad(angle));
  const vy = Math.sin(deg2rad(angle));
  return vec2(vx, vy);
};
