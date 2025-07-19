import type { Vec2 } from "kaplay";
import k from "@/game";

const { vec2, deg2rad } = k;

export const angleToVec2 = (angle: number): Vec2 => {
  const vx = Math.cos(deg2rad(angle));
  const vy = Math.sin(deg2rad(angle));
  return vec2(vx, vy);
};
