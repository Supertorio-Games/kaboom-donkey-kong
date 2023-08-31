import type { Comp, SpriteComp, PosComp, AudioPlay, RectComp, BodyComp } from "kaboom";
import type { LadderComp} from "@/scenes/rivetsScene";
import k from "@/game";
import { levelMargin } from "@/config";
import createMachine from "@/utils/stateMachine";
import inputManager from "@/managers/inputManager";
import { clamp } from "@/utils/math";

import type { LevelLadder } from "@/config";
import type { StateMachine } from "@/utils/stateMachine";



export type CharacterControllerArcadeComp = {
  characterState: StateMachine | null;
  ladder: LadderComp | null,
  stopAudio: () => void;
  _setDirection: (input: number) => void;
  _move: (input: number) => void;
  _climb: (input: number) => void;
  _jump: () => void;
  _land: () => void;
  _stop: () => void;
  _canClimb: (input: number) => boolean;
  inputManager: any;
} & Comp;

export default function characterControllerArcade(
): CharacterControllerArcadeComp {
  const WALK_SPEED = 50;
  const CLIMB_SPEED = 20;
  const JUMP_FORCE = 300;
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
    ladder:  null,
    require: ["pos", "sprite"],
    characterState: null,
    inputManager: null,
    add(this: SpriteComp & BodyComp & CharacterControllerArcadeComp) {
      this.inputManager = inputManager(k);
      this.characterState = createMachine({
        initialState: "idle",
        states: {
          idle: {
            actions: {
              onEnter: () => {
                this.stopAudio();
                this.play("idle");
                this.gravityScale = 1;
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
                this.gravityScale = 1;
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
                this.gravityScale = 0;
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
    update(this: BodyComp & CharacterControllerArcadeComp) {
      if (this.characterState?.value === "jump" && this.isGrounded()) {
        this._land();
        return;
      }

      const horzInput = this.inputManager.getAxisHoriz();
      const vertInput = this.inputManager.getAxisVert();
      if (horzInput !== 0) this._move(horzInput);
      else if (vertInput !== 0) this._climb(vertInput);
      else this._stop();
    },
    destroy() {
      onJumpCancel?.();
    },
    stopAudio() {
      if (currentAudio) {
        currentAudio.paused = true;
        currentAudio = null;
      }
    },
    _setDirection(this: SpriteComp, horzInput: number) {
      direction = horzInput !== 0 ? horzInput : direction;
      this.flipX = direction < 0;
    },
    _move(this: PosComp & CharacterControllerArcadeComp, horzInput: number) {
      this._setDirection(horzInput);
      if (
        this.characterState?.value === "climb" ||
        this.characterState?.value === "climbIdle"
      ) {
        return;
      }
        
      if (this.characterState?.value === "idle") {
        this.characterState.transition(this.characterState.value, "walk");
      }

      this.move(WALK_SPEED * horzInput, 0);
    },
    _climb(this: PosComp & CharacterControllerArcadeComp, vertInput: number) {
      if (this.characterState?.value === "climbIdle") {
        this.characterState.transition(this.characterState.value, "continue");
      }
      if (this.characterState?.value === "climb") {
        if (this.ladder == null) {
          this.characterState.transition(this.characterState.value, "finish");
          return;
        };
        this.pos.y += CLIMB_SPEED * vertInput * -1 * k.dt();
        
      } else if (this._canClimb(vertInput)) {
        this.characterState?.transition(this.characterState.value, "climb");
      }
    },
    _jump(this: PosComp & BodyComp & CharacterControllerArcadeComp) {
      const result = this.characterState?.transition(
        this.characterState.value,
        "jump"
      );
      if (result === "jump") {
        this.jump(JUMP_FORCE);
      }
    },
    _land(this: PosComp & CharacterControllerArcadeComp) {
      this.characterState?.transition(
        this.characterState.value,
        this.inputManager.getAxisHoriz() !== 0 ? "landAndGo" : "land"
      );
    },
    _stop() {
      this.characterState?.transition(this.characterState.value, "stop");
    },
    _canClimb(this: PosComp & CharacterControllerArcadeComp) {
      return this.ladder !== null;
    },
  };
}
