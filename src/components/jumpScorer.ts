import type { Comp, PosComp } from "kaboom";
import k from "@/game";
import type { CharacterControllerComp } from "./characterController";

export type JumpScorerComponent = Comp;

export default function jumpScorer(
  onScoreBarrel: () => void
): JumpScorerComponent {
  return {
    id: "jumpScorer",
    require: ["characterController"],
    update(this: PosComp & CharacterControllerComp & JumpScorerComponent) {
      if (this.characterState?.value === "jump") {
        const allBarrels = k.get("barrel");
        for (let barrel of allBarrels) {
          if (!barrel.scored) {
            if (
              this.pos.y - barrel.pos.y < 6 &&
              this.pos.x - barrel.pos.x < 1
            ) {
              barrel.scored = true;
              onScoreBarrel();
            }
          }
        }
      }
    },
  };
}
