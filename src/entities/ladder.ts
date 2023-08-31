import k from "../game";

import type { Vec2 } from "kaboom";

export const ladderTag = "ladder";

export const ladder = (startPos: Vec2) => [
    k.pos(startPos),
    k.rect(8, 26),
    k.color(0, 0, 255), //TOOD: Remove
    k.area(),
    ladderTag
  ];
