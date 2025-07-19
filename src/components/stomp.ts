import type { SpriteComp } from "kaplay";
import k from "@/game";
import inputManager from "@/managers/inputManager";

export type StompComp = {
  isStomping: boolean;
  inputManager: any;
} & SpriteComp;

export default function stomp() {
  return {
    id: "stomp",
    require: ["sprite"],
    isStomping: false,
    inputManager: null,
    add(this: StompComp) {
      this.inputManager = inputManager(k);
    },
    update(this: StompComp) {
      const horzInput = this.inputManager.getAxisHoriz();
      const vertInput = this.inputManager.getAxisVert();
      if ((horzInput != 0 || vertInput != 0) && !this.isStomping) {
        this.play("stomp");
        this.isStomping = true;
      } else if (horzInput == 0 && vertInput == 0 && this.isStomping) {
        this.play("idle");
        this.isStomping = false;
      }
    },
  };
}
