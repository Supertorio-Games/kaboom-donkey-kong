import type { Vec2 } from "kaboom";
import k from "@/game";
import { clamp } from "@/utils/math";
import { displayNumber } from "@/entities/displayNumber";
import type { DisplayNumberComp } from "@/entities/displayNumber";

export enum NUMBER_BAR_TYPE {
  TIMER = 0,
  SCORE = 10,
}

const getNumberDigits = (num: number) => {
  return num
    .toString()
    .split("")
    .map((n) => parseInt(n));
};

export default function numberBar(
  startValue: number,
  barType: NUMBER_BAR_TYPE,
  pos: Vec2
) {
  let value = startValue;
  let numberSprites: DisplayNumberComp[] = [];
  let numDigits = getNumberDigits(value);
  const numberSpriteWidth = 11;
  const spriteSpacing = 5;

  for (let i = 0; i < numDigits.length; i++) {
    const nextSpriteOffset = numberSpriteWidth + spriteSpacing;
    const sprite = k.add(
      displayNumber(k.vec2(pos.x - i * nextSpriteOffset, pos.y))
    );

    // Since we draw the sprites from right to left, we have to adjust the
    // number frames in reverse. We unshift them onto the array in state so
    // that we can address them left to right on update.
    const frameNumber = numDigits[numDigits.length - 1 - i] + barType;
    sprite.frame = clamp(0, 19, frameNumber);
    numberSprites.unshift(sprite);
  }

  function updateNumber(nextNumber: number) {
    value = nextNumber;
    numDigits = getNumberDigits(value);
    for (let i = 0; i < numDigits.length; i++) {
      const frameNumber = numDigits[i] + barType;
      numberSprites[i].frame = clamp(0, 19, frameNumber);
    }
  }

  return {
    updateNumber,
  };
}
