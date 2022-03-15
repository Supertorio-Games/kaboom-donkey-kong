import k from "../game";

export default function jumpScorer(onScoreBarrel) {
  return {
    id: "jumpScorer",
    require: ["characterController"],
    update() {
      if (this.characterState.value === "jump") {
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
