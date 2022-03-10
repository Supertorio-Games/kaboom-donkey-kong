import k from "../game";
import { rivitsMap } from "../entities/rivitsMap";

export const Level2SceneKey = "level2";

export const Level2Scene = k.scene(
  Level2SceneKey,
  async ({ gameState, updateState, onCompleteLevel }) => {
    // Level Map
    k.add(rivitsMap());
  }
);
