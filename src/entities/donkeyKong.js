import k from "../game";
import stomp from "../components/stomp";

export const donkeyKong = (starPos) => [
  k.sprite("donkeyKong", {
    animSpeed: 0.4,
    anim: "idle",
  }),
  k.pos(starPos),
  stomp(),
];
