import k from "@/game";
import { levelMargin } from "@/config";

export const rivitsMap = () => [
  k.sprite("level2"),
  k.anchor("botleft"),
  k.pos(levelMargin, k.height() - levelMargin),
];
