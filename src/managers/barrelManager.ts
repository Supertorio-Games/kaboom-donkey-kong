import { Vec2 } from "kaboom";
import k from "@/game";
import barrel, { barrelTag } from "@/entities/barrel";

export default function barrelManager(spawnPos: Vec2, spawnDelay: number) {
  let cancelSpawing: () => void;

  function startSpawning() {
    cancelSpawing = k.loop(spawnDelay, () => {
      k.add(barrel(spawnPos));
    });
  }

  function stopSpawing() {
    cancelSpawing && cancelSpawing();
    k.every(barrelTag, k.destroy);
  }

  return {
    startSpawning,
    stopSpawing,
  };
}
