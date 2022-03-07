import k from "../game";
import { levelMargin } from "../config";

export const barrelsMap = () => [
  k.sprite("level1"),
  k.pos(levelMargin, k.height() - levelMargin),
  k.origin("botleft"),
];
