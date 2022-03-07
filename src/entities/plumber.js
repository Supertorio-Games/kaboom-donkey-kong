import k from "../game";
import characterController from "../components/characterController";

export const plumberTag = "plumber";

export const plumber = (starPos, levelConfig) => [
  k.sprite("plumber", {
    anim: "idle",
  }),
  k.area({
    offset: k.vec2(0, -5),
    width: 16,
    height: 10,
  }),
  k.body({
    solid: false,
    weight: 0,
  }),
  k.origin("botleft"),
  k.pos(starPos),
  characterController(levelConfig),
  plumberTag,
];
