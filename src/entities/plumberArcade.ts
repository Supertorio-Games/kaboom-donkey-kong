import {
  AreaComp,
  BodyComp,
  PosComp,
  SpriteComp,
  Vec2,
} from "kaboom";
import k from "@/game";
import jumpScorer, { JumpScorerComponent } from "@/components/jumpScorer";
import characterControllerArcade, { CharacterControllerArcadeComp } from '@/components/characterControlleArcade';

export const plumberTag = "plumber";

type PlumberEntity = (
  | string
  | SpriteComp
  | AreaComp
  | BodyComp
  | PosComp
  | JumpScorerComponent
  | CharacterControllerArcadeComp
)[];

type ScoreBarrelCallback = () => void;

export const plumber = (
  starPos: Vec2,
  { onScoreBarrel = null }: { onScoreBarrel: ScoreBarrelCallback | null }
): PlumberEntity => {
  const plumberConfig: PlumberEntity = [
    k.sprite("plumber", {
      anim: "idle",
    }),
    k.pos(starPos),
    k.area(),
    k.body(),
    k.anchor("botleft"),
    characterControllerArcade(),
    plumberTag,
  ];

  if (onScoreBarrel) {
    plumberConfig.push(jumpScorer(onScoreBarrel));
  }

  return plumberConfig;
};
