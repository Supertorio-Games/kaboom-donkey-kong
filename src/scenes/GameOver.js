import k from "../game";
import { levelMargin } from "../config";

export const GameOverSceneKey = "game-over";

export const GameOverScene = k.scene(
  GameOverSceneKey,
  ({ gameState, onReturnToStart }) => {
    k.add([
      k.text("GAME OVER", {
        size: 18,
        width: 130,
        font: "sink",
        lineSpacing: 5,
      }),
      k.pos(levelMargin + 32, levelMargin + 30),
      k.color(66, 152, 211),
    ]);

    k.add([
      k.text("Press Enter to Continue", {
        size: 8,
        width: 140,
        font: "sink",
      }),
      k.pos(levelMargin + 25, levelMargin + 140),
      k.color(255, 255, 255),
    ]);

    k.onKeyPress("enter", () => {
      onReturnToStart();
    });
  }
);
