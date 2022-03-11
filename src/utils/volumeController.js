const DATA_KEY_VOLUME = "dk_volume";
const volumeIncrement = 0.2;

export default function volumeController(kaboomInst) {
  this.volumeDisplay = kaboomInst.add([
    kaboomInst.text("Volume", {
      size: 5,
      width: 60,
      font: "sink",
    }),
    kaboomInst.pos(kaboomInst.width() - 50, 5),
    kaboomInst.color(255, 255, 255),
    kaboomInst.opacity(0),
  ]);

  this.displayVolume = (nextVolume) => {
    this.volumeDisplay.text = `Volume: ${Math.round(nextVolume * 100)}%`;
    this.volumeDisplay.opacity = 1;

    // Hide the volume afer a couple seconds
    kaboomInst.wait(3, () => {
      this.volumeDisplay.opacity = 0;
    });
  };

  kaboomInst.onKeyRelease("v", () => {
    const currentVolume = kaboomInst.getData(DATA_KEY_VOLUME, 1);
    let nextVolume = currentVolume + volumeIncrement;
    if (nextVolume > 1) nextVolume = 0;
    kaboomInst.volume(nextVolume);
    kaboomInst.setData(DATA_KEY_VOLUME, nextVolume);
    this.displayVolume(nextVolume);
  });

  kaboomInst.volume(kaboomInst.getData(DATA_KEY_VOLUME, 1));
}
