import k from "../game";
import inputManager from "../utils/inputManager";

export default function stomp() {
  return {
    id: "stomp",
    require: ["sprite"],
    isStomping: false,
    add() {
      this.inputManager = new inputManager(k);
    },
    update() {
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
