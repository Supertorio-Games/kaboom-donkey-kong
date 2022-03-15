import k from "../game";
import characterController from "../components/characterController";
import jumpScorer from "../components/jumpScorer";

export const plumberTag = "plumber";

export const plumber = (starPos, levelConfig, { onScoreBarrel = null }) => {
  const plumberConfig = [
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

  if (onScoreBarrel) {
    plumberConfig.push(jumpScorer(onScoreBarrel));
  }

  return plumberConfig;
};
