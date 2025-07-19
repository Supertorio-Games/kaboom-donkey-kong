import type { Vec2 } from "kaplay";
import k from "@/game";
import roll from "@/components/roll";

export const barrelTag = "barrel";

export const barrel = (starPos: Vec2) => [
  k.sprite("barrel", {
    animSpeed: 1,
    anim: "roll",
  }),
  k.pos(starPos.x, starPos.y),
  k.area(),
  k.body({
    isStatic: false,
    gravityScale: 0,
  }),
  roll(),
  barrelTag,
];

export default barrel;
