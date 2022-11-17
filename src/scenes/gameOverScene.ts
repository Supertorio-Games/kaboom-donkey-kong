import k from "@/game";
import { levelMargin, displayFont } from "@/config";

export const SCENE_KEY = "game-over";

export default k.scene(SCENE_KEY, ({ onReturnToStart }) => {
  k.add([
    k.text("GAME OVER", {
      size: 18,
      width: 130,
      font: displayFont,
      lineSpacing: 5,
    }),
    k.pos(levelMargin + 32, levelMargin + 30),
    k.color(66, 152, 211),
  ]);

  k.add([
    k.text("Press Enter to Continue", {
      size: 8,
      width: 140,
      font: displayFont,
    }),
    k.pos(levelMargin + 25, levelMargin + 140),
    k.color(255, 255, 255),
  ]);

  k.onKeyPress("enter", () => {
    onReturnToStart();
  });
});
