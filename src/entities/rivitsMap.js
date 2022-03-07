import k from "../game";
import { levelMargin } from "../config";

export const barrelsMap = () => [
  k.sprite("level2"),
  k.pos(levelMargin, k.height() - levelMargin),
  k.origin("botleft"),
  k.scale(1),
  "map",
];
