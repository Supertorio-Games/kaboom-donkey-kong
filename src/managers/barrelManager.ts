import { KEventController, Vec2 } from "kaplay";
import k from "@/game";
import barrel, { barrelTag } from "@/entities/barrel";

export default function barrelManager(spawnPos: Vec2, spawnDelay: number) {
  let spawnerController: KEventController;

  function startSpawning() {
    spawnerController = k.loop(spawnDelay, () => {
      k.add(barrel(spawnPos));
    });
  }

  function stopSpawing() {
    spawnerController?.cancel();
    k.destroyAll(barrelTag);
  }

  return {
    startSpawning,
    stopSpawing,
  };
}
