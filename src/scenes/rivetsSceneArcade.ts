import k from "@/game";
import { rivitsMap } from "@/entities/rivitsMap";
import { levelMargin, levelConfig } from "@/config";
import {ladder, ladderTag } from "@/entities/ladder";
import { plumber, plumberTag } from "@/entities/plumberArcade";
import VolumeController from "@/managers/volumeManager";
import { type PosComp, type RectComp, type AreaComp, Vec2 } from "kaboom";

export const SCENE_KEY = "level2";
const pluberSpawnPos = k.vec2(levelMargin + 30, k.height() - levelMargin - 20);

export type LadderComp = PosComp & RectComp & AreaComp;

export default k.scene(SCENE_KEY, () => {
  VolumeController(k);

  k.setGravity(2400)

  // Level Map
  k.add(rivitsMap());

  k.add([
    k.pos(20, 207),
    k.rect(192, 1),
    k.area(),
    k.body({ isStatic: true }),
  ])

  k.add([
    k.pos(20, 179),
    k.rect(192, 1),
    k.area(),
    k.body({ isStatic: true }),
  ])

  k.add( ladder(k.vec2(36, 180)))


  // Plumber
  const mario = k.add(
    plumber(pluberSpawnPos, {
      onScoreBarrel: null,
    })
  );

  k.onCollide(plumberTag, ladderTag, (_plumber, ladder) => {
    mario.ladder = ladder as unknown as LadderComp;
  });

  k.onCollideEnd(plumberTag, ladderTag, () => {
    mario.ladder = null;
  });
});
