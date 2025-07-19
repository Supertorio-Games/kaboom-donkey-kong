import type {
  ColorComp,
  GameObj,
  KAPLAYCtx,
  OpacityComp,
  PosComp,
  TextComp,
} from "kaplay";
import {titleFont} from '../config';

const DATA_KEY_VOLUME = "dk_volume";
const volumeIncrement = 0.2;

export interface IVolumeController {
  volumeDisplay: GameObj<TextComp | PosComp | ColorComp | OpacityComp>;
}

export default function volumeController(kaplayInst: KAPLAYCtx) {
  const volumeDisplay = kaplayInst.add([
    kaplayInst.text("Volume", {
      size: 5,
      width: 60,
      font: titleFont,
    }),
    kaplayInst.pos(kaplayInst.width() - 60, 5),
    kaplayInst.color(255, 255, 255),
    kaplayInst.opacity(0),
  ]);

  function displayVolume(nextVolume: number) {
    volumeDisplay.text = `Volume: ${Math.round(nextVolume * 100)}%`;
    volumeDisplay.opacity = 1;

    kaplayInst.wait(3, () => {
      volumeDisplay.opacity = 0;
    });
  }

  kaplayInst.onKeyRelease("v", () => {
    const currentVolume = kaplayInst.getVolume();
    let nextVolume = currentVolume + volumeIncrement;
    if (nextVolume > 1) nextVolume = 0;
    kaplayInst.setVolume(nextVolume);
    kaplayInst.setData(DATA_KEY_VOLUME, nextVolume);
    displayVolume(nextVolume);
  });

  const savedVolume = kaplayInst.getData(DATA_KEY_VOLUME, 1) || kaplayInst.getVolume();
  kaplayInst.setVolume(savedVolume);
}
