import k from "../game";

export default function livesCounter(startLives, color, pos) {
  this.extraLives = startLives - 1;
  this.lifeMarkers = [];
  this.lifeTokenWidth = 8;
  this.tokenSpacing = 8;

  this.addLifeMarkers = () => {
    const tokenOffset = this.lifeTokenWidth + this.tokenSpacing;
    for (let i = 0; i < this.extraLives; i++) {
      this.lifeMarkers.push(
        k.add([
          k.pos(pos.x - i * tokenOffset, pos.y),
          k.rect(this.lifeTokenWidth, this.lifeTokenWidth),
          k.color(...color),
          "lifeCouner",
        ])
      );
    }
  };

  this.removeLife = () => {
    if (this.lifeMarkers.length > 0) {
      const usedLife = this.lifeMarkers.pop();
      k.destroy(usedLife);
    }
  };
}
