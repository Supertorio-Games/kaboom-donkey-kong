import type { GameObj, PosComp, SpriteComp } from "kaboom";
import k from "@/game";
import { levelMargin } from "@/config";
import { angleToVec2 } from "@/utils/angle2Vector";

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
  FALL = "falling",
}

export type RollComp = {
  direction: Direction;
  isDropping: boolean;
  drops: number;
  lastDropPos: number;
} & GameObj &
  PosComp &
  SpriteComp;

const rollSpeed = 50;
const dropSpeed = 40;
const rightBounds = levelMargin + 176;
const leftBounds = levelMargin;
const destroyBounds = levelMargin + 24;

export default function roll() {
  return {
    id: "roll",
    require: ["pos", "sprite"],
    direction: Direction.RIGHT,
    isDropping: false,
    drops: 0,
    lastDropPos: 0,
    update(this: RollComp) {
      if (!this.isDropping) {
        //Rolling
        if (this.drops > 4 && this.pos.x < destroyBounds) {
          this.destroy();
        } else if (
          (this.direction === Direction.RIGHT && this.pos.x > rightBounds) ||
          (this.direction === Direction.LEFT && this.pos.x < leftBounds)
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
    _roll(this: RollComp) {
      if (this.drops > 0 && this.drops < 5) {
        const dir = this.direction === Direction.RIGHT ? 1 : -1;
        const angle = angleToVec2(this.direction === Direction.RIGHT ? 2 : -2);
        this.pos.x += angle.x * rollSpeed * k.dt() * dir;
        this.pos.y += angle.y * rollSpeed * k.dt() * dir;
      } else {
        this.pos.x +=
          rollSpeed * k.dt() * (this.direction === Direction.RIGHT ? 1 : -1);
      }
    },
    _fall(this: RollComp) {
      this.pos.y += dropSpeed * k.dt();
      if (this.pos.y > this.lastDropPos + 21) {
        this.isDropping = false;
        this.play("roll");
      }
    },
    _dropPlatform(this: RollComp) {
      this.direction =
        this.direction === Direction.LEFT ? Direction.RIGHT : Direction.LEFT;
      this.isDropping = true;
      this.play("fall");
      this.drops++;
      this.lastDropPos = this.pos.y;
    },
  };
}
