import k from "../game";
import { rivitsMap } from "../entities/rivitsMap";
import VolumeController from "../utils/volumeController";

export const Level2SceneKey = "level2";

export const Level2Scene = k.scene(
  Level2SceneKey,
  async ({ gameState, updateState, onCompleteLevel }) => {
    let levelTimer;
    let volumeController = new VolumeController(k);

    // Level Map
    k.add(rivitsMap());
  }
);
