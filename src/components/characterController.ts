import type { Comp, SpriteComp, PosComp, AudioPlay } from "kaboom";
import k from "@/game";
import { levelMargin } from "@/config";
import createMachine from "@/utils/stateMachine";
import inputManager from "@/managers/inputManager";
import { angleToVec2 } from "@/utils/angle2Vector";
import { clamp } from "@/utils/math";

import type { LevelDefinition, LevelLadder } from "@/config";
import type { StateMachine } from "@/utils/stateMachine";

export type CharacterControllerComp = {
  characterState: StateMachine | null;
  stopAudio: () => void;
  _setDirection: (input: number) => void;
  _move: (input: number) => void;
  _climb: (input: number) => void;
  _jump: () => void;
  _land: () => void;
  _stop: () => void;
  _getCurrentPlatform: () => number;
  _canClimb: (input: number) => boolean;
  inputManager: any;
} & Comp;

export default function characterController(
  levelConfig: LevelDefinition
): CharacterControllerComp {
  const WALK_SPEED = 50;
  const CLIMB_SPEED = 20;
  const JUMP_DURATION = 0.5;
  const JUMP_OFFSET = 6;
  const LADDER_MARGIN_LEFT = 8;
  const LADDER_MARGIN_RIGHT = 4;
  const SPRITE_WIDTH = 16;

  let currentLadder: LevelLadder | null = null;
  let direction: number = 1;
  let currentAudio: AudioPlay | null = null;
  let onJumpCancel: undefined | (() => void);

  return {
    id: "characterController",
    require: ["pos", "sprite"],
    characterState: null,
    inputManager: null,
    add(this: SpriteComp & CharacterControllerComp) {
      this.inputManager = inputManager(k);
      this.characterState = createMachine({
        initialState: "idle",
        states: {
          idle: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                this.play("idle");
              },
            },
            transitions: {
              walk: {
                target: "walk",
              },
              jump: {
                target: "jump",
              },
              climb: {
                target: "climb",
              },
            },
          },
          walk: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                currentAudio = k.play("walk", { loop: true });
                this.play("walk");
              },
            },
            transitions: {
              stop: {
                target: "idle",
              },
              jump: {
                target: "jump",
              },
              climb: {
                target: "climb",
              },
            },
          },
          jump: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                this.play("jump");
                currentAudio = k.play("jump");
              },
            },
            transitions: {
              land: {
                target: "idle",
              },
              landAndGo: {
                target: "walk",
              },
            },
          },
          climb: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                currentAudio = k.play("walk", { loop: true });
                this.play("climb");
              },
            },
            transitions: {
              stop: {
                target: "climbIdle",
              },
              finish: {
                target: "idle",
              },
            },
          },
          climbIdle: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                this.play("climbIdle");
              },
            },
            transitions: {
              continue: {
                target: "climb",
              },
            },
          },
        },
      });
      onJumpCancel = this.inputManager.onJump(this._jump);
    },
    update() {
      const horzInput = this.inputManager.getAxisHoriz();
      const vertInput = this.inputManager.getAxisVert();
      if (horzInput !== 0) this._move(horzInput);
      else if (vertInput !== 0) this._climb(vertInput);
      else this._stop();
    },
    destroy() {
      onJumpCancel && onJumpCancel();
    },
    stopAudio() {
      if (currentAudio) {
        currentAudio.stop();
        currentAudio = null;
      }
    },
    _setDirection(this: SpriteComp, horzInput: number) {
      direction = horzInput !== 0 ? horzInput : direction;
      this.flipX(direction < 0);
    },
    _move(this: PosComp & CharacterControllerComp, horzInput: number) {
      this._setDirection(horzInput);
      if (
        this.characterState?.value === "climb" ||
        this.characterState?.value === "climbIdle"
      )
        return;
      if (this.characterState?.value === "idle") {
        this.characterState.transition(this.characterState.value, "walk");
      }
      const currPlatform = this._getCurrentPlatform();
      const platformAngleDir = levelConfig.platforms[currPlatform].slope;
      const slopeAngle = levelConfig.slopeAngle || 0;
      const movementVector = angleToVec2(
        direction < 0 ? slopeAngle : slopeAngle * -1
      );

      const nextXPos =
        this.pos.x + movementVector.x * WALK_SPEED * k.dt() * direction;

      // Only recalculate y pos when walking on a slope
      const nextYPos =
        platformAngleDir !== 0
          ? this.pos.y +
            movementVector.y * WALK_SPEED * k.dt() * platformAngleDir
          : this.pos.y;

      this.pos.x = clamp(
        levelConfig.platforms[currPlatform].xMin + levelMargin,
        levelConfig.platforms[currPlatform].xMax + levelMargin - SPRITE_WIDTH,
        nextXPos
      );

      this.pos.y = clamp(
        levelConfig.platforms[currPlatform].yMin +
          levelMargin +
          levelConfig.offsetTop -
          JUMP_OFFSET,
        levelConfig.platforms[currPlatform].yMax +
          levelMargin +
          levelConfig.offsetTop,
        nextYPos
      );
    },
    _climb(this: PosComp & CharacterControllerComp, vertInput: number) {
      if (this.characterState?.value === "climbIdle") {
        this.characterState.transition(this.characterState.value, "continue");
      }
      if (this.characterState?.value === "climb") {
        if (currentLadder == null) return;
        this.pos.y += CLIMB_SPEED * vertInput * -1 * k.dt();

        // Check if we reached the ladder bounds
        const ladderTopOffset =
          currentLadder.yMin + levelConfig.offsetTop + levelMargin;
        const ladderBotOffset =
          currentLadder.yMax + levelConfig.offsetTop + levelMargin;
        if (this.pos.y < ladderTopOffset || this.pos.y > ladderBotOffset) {
          this.pos.y = clamp(ladderTopOffset, ladderBotOffset, this.pos.y);
          this.characterState.transition(this.characterState.value, "finish");
          currentLadder = null;
        }
      } else if (this._canClimb(vertInput)) {
        this.characterState?.transition(this.characterState.value, "climb");
      }
    },
    _jump(this: PosComp & CharacterControllerComp) {
      const result = this.characterState?.transition(
        this.characterState.value,
        "jump"
      );
      if (result === "jump") {
        this.pos.y -= JUMP_OFFSET;

        k.wait(JUMP_DURATION, () => {
          this._land();
        });
      }
    },
    _land(this: PosComp & CharacterControllerComp) {
      const currPlatform = this._getCurrentPlatform();
      this.pos.y = clamp(
        levelConfig.platforms[currPlatform].yMin +
          levelMargin +
          levelConfig.offsetTop,
        levelConfig.platforms[currPlatform].yMax +
          levelMargin +
          levelConfig.offsetTop,
        this.pos.y + JUMP_OFFSET
      );
      this.characterState?.transition(
        this.characterState.value,
        this.inputManager.getAxisHoriz() !== 0 ? "landAndGo" : "land"
      );
    },
    _stop() {
      this.characterState?.transition(this.characterState.value, "stop");
    },
    _getCurrentPlatform(this: PosComp) {
      return levelConfig.platforms.reduce((platform, platformConfig, idx) => {
        const actualOffset =
          platformConfig.yMax + levelConfig.offsetTop + levelMargin;
        return this.pos.y <= actualOffset && platform < 0 ? idx : platform;
      }, -1);
    },
    _canClimb(this: PosComp, inputVal: number) {
      const offsetTop = levelConfig.offsetTop + levelMargin;
      // Are we close enough horizontally
      for (let l of levelConfig.ladders) {
        if (
          this.pos.x > l.xPos + levelMargin - LADDER_MARGIN_LEFT &&
          this.pos.x < l.xPos + levelMargin + LADDER_MARGIN_RIGHT
        ) {
          // Are we close enough to the top or bottom of the ladder
          if (
            (inputVal > 0 && Math.abs(this.pos.y - (l.yMax + offsetTop)) < 2) ||
            (inputVal < 0 && Math.abs(this.pos.y - (l.yMin + offsetTop)) < 2)
          ) {
            currentLadder = { ...l };
            return true;
          }
        }
      }
      return false;
    },
  };
}
