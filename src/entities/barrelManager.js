import k from "../game";
import roll from "../components/roll";

export const barrelTag = "barrel";

const barrel = (starPos) => [
  k.sprite("barrel", {
    animSpeed: 1,
    anim: "roll",
  }),
  k.pos(starPos.x, starPos.y),
  k.area(),
  k.body({
    solid: false,
    weight: 0,
  }),
  roll(),
  barrelTag,
];

export default function barrelManager(spawnPos, spawnDelay) {
  this.startSpawning = () => {
    this.cancelSpawing = k.loop(spawnDelay, () => {
      k.add(barrel(spawnPos));
    });
  };

  this.stopSpawing = () => {
    this.cancelSpawing();
    k.every(barrelTag, k.destroy);
  };
}
