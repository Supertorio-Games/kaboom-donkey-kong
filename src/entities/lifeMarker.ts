import { Vec2 } from "kaplay";
import type { GameObj, PosComp, RectComp, ColorComp } from "kaplay";
import k from "@/game";

export type MarkerComp = GameObj<PosComp | RectComp | ColorComp>;

export const MARKER_TAG = "lifeCounter";

export const lifeMarker = (
  startPos: Vec2,
  width: number,
  height: number,
  color: [number, number, number]
) => [k.pos(startPos), k.rect(width, height), k.color(...color), MARKER_TAG];
