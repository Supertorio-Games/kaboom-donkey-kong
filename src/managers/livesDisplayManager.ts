import type { Vec2 } from "kaplay";
import k from "@/game";
import { lifeMarker } from "@/entities/lifeMarker";
import type { MarkerComp } from "@/entities/lifeMarker";

export default function livesCounter(
  startLives: number,
  color: [number, number, number],
  pos: Vec2
) {
  let extraLives = startLives - 1;
  let lifeMarkers: MarkerComp[] = [];
  const lifeTokenWidth = 8;
  const tokenSpacing = 8;

  function addLifeMarkers() {
    const tokenOffset = lifeTokenWidth + tokenSpacing;
    for (let i = 0; i < extraLives; i++) {
      lifeMarkers.push(
        k.add(
          lifeMarker(
            k.vec2(pos.x - i * tokenOffset, pos.y),
            lifeTokenWidth,
            lifeTokenWidth,
            color
          )
        )
      );
    }
  }

  function removeLife() {
    if (lifeMarkers.length > 0) {
      const usedLife = lifeMarkers.pop();
      if (usedLife) {
        k.destroy(usedLife);
      }
    }
  }

  return {
    addLifeMarkers,
    removeLife,
  };
}
