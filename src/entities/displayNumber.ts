import { Vec2 } from "kaplay";
import type { GameObj, PosComp, SpriteComp } from "kaplay";
import k from "@/game";

export type DisplayNumberComp = GameObj<SpriteComp | PosComp>;

export const DISPLAY_NUMBER_TAG = "numberDigit";

export const displayNumber = (pos: Vec2) => [
  k.sprite("numbers"),
  k.pos(pos),
  DISPLAY_NUMBER_TAG,
];
