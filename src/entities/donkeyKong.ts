import k from "../game";
import stomp from "../components/stomp";

import type { Vec2 } from "kaplay";

export const donkeyKong = (starPos: Vec2) => [
  k.sprite("donkeyKong", {
    animSpeed: 0.4,
    anim: "idle",
  }),
  k.pos(starPos),
  stomp(),
];
