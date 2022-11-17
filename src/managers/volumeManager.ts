import type {
  ColorComp,
  GameObj,
  KaboomCtx,
  OpacityComp,
  PosComp,
  TextComp,
} from "kaboom";

const DATA_KEY_VOLUME = "dk_volume";
const volumeIncrement = 0.2;

export interface IVolumeController {
  volumeDisplay: GameObj<TextComp | PosComp | ColorComp | OpacityComp>;
}

export default function volumeController(kaboomInst: KaboomCtx) {
  const volumeDisplay = kaboomInst.add([
    kaboomInst.text("Volume", {
      size: 5,
      width: 60,
      font: "sink",
    }),
    kaboomInst.pos(kaboomInst.width() - 50, 5),
    kaboomInst.color(255, 255, 255),
    kaboomInst.opacity(0),
  ]);

  function displayVolume(nextVolume: number) {
    volumeDisplay.text = `Volume: ${Math.round(nextVolume * 100)}%`;
    volumeDisplay.opacity = 1;

    kaboomInst.wait(3, () => {
      volumeDisplay.opacity = 0;
    });
  }

  kaboomInst.onKeyRelease("v", () => {
    const currentVolume = kaboomInst.getData(DATA_KEY_VOLUME, 1);
    let nextVolume = currentVolume + volumeIncrement;
    if (nextVolume > 1) nextVolume = 0;
    kaboomInst.volume(nextVolume);
    kaboomInst.setData(DATA_KEY_VOLUME, nextVolume);
    displayVolume(nextVolume);
  });

  kaboomInst.volume(kaboomInst.getData(DATA_KEY_VOLUME, 1));
}
