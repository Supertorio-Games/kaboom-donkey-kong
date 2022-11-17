import k from "@/game";
import { rivitsMap } from "@/entities/rivitsMap";
import VolumeController from "@/managers/volumeManager";

export const SCENE_KEY = "level2";

export default k.scene(SCENE_KEY, async () => {
  VolumeController(k);

  // Level Map
  k.add(rivitsMap());
});
