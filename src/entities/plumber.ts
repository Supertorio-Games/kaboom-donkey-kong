import {
  AreaComp,
  BodyComp,
  OriginComp,
  PosComp,
  SpriteComp,
  Vec2,
} from "kaboom";
import k from "@/game";
import characterController, {
  CharacterControllerComp,
} from "@/components/characterController";
import jumpScorer, { JumpScorerComponent } from "@/components/jumpScorer";
import { LevelDefinition } from "@/config";

export const plumberTag = "plumber";

type PlumberEntity = (
  | string
  | SpriteComp
  | AreaComp
  | BodyComp
  | OriginComp
  | PosComp
  | CharacterControllerComp
  | JumpScorerComponent
)[];

type ScoreBarrelCallback = () => void;

export const plumber = (
  starPos: Vec2,
  levelConfig: LevelDefinition,
  { onScoreBarrel = null }: { onScoreBarrel: ScoreBarrelCallback | null }
): PlumberEntity => {
  const plumberConfig: PlumberEntity = [
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
