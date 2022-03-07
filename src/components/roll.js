import k from "../game";
import { levelMargin } from "../config";
import { angleToVec2 } from "../utils/angle2Vector";

const DIR = {
  LEFT: "left",
  RIGHT: "right",
  FALL: "falling",
};

const rollSpeed = 50;
const dropSpeed = 40;
const rightBounds = levelMargin + 176;
const leftBounds = levelMargin;
const destroyBounds = levelMargin + 24;

export default function roll() {
  return {
    id: "roll",
    require: ["pos", "sprite"],
    direction: DIR.RIGHT,
    isFalling: false,
    drops: 0,
    lastDropPos: 0,
    update() {
      if (!this.isFalling) {
        //Rolling
        if (this.drops > 4 && this.pos.x < destroyBounds) {
          this.destroy();
        } else if (
          (this.direction === DIR.RIGHT && this.pos.x > rightBounds) ||
          (this.direction === DIR.LEFT && this.pos.x < leftBounds)
        ) {
          this._dropPlatform();
        } else {
          this._roll();
        }
      } else {
        // Falling
        this._fall();
      }
    },
    _roll() {
      if (this.drops > 0 && this.drops < 5) {
        const dir = this.direction === DIR.RIGHT ? 1 : -1;
        const angle = angleToVec2(this.direction === DIR.RIGHT ? 2 : -2);
        this.pos.x += angle.x * rollSpeed * k.dt() * dir;
        this.pos.y += angle.y * rollSpeed * k.dt() * dir;
      } else {
        this.pos.x +=
          rollSpeed * k.dt() * (this.direction === DIR.RIGHT ? 1 : -1);
      }
    },
    _fall() {
      this.pos.y += dropSpeed * k.dt();
      if (this.pos.y > this.lastDropPos + 21) {
        this.isFalling = false;
        this.play("roll");
      }
    },
    _dropPlatform() {
      this.direction = this.direction === DIR.LEFT ? DIR.RIGHT : DIR.LEFT;
      this.isFalling = true;
      this.play("fall");
      this.drops++;
      this.lastDropPos = this.pos.y;
    },
  };
}
