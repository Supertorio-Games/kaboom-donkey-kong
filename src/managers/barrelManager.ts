import { EventController, Vec2 } from "kaboom";
import k from "@/game";
import barrel, { barrelTag } from "@/entities/barrel";

export default function barrelManager(spawnPos: Vec2, spawnDelay: number) {
  let spawnerController: EventController;

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
