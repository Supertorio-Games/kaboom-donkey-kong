import k from "@/game";
import { levelMargin, titleFont } from "@/config";

export const SCENE_KEY = "game-over";

export default k.scene(SCENE_KEY, ({ onReturnToStart }) => {
  k.add([
    k.text("GAME\nOVER", {
      size: 20,
      width: 150,
      font: titleFont,
      lineSpacing: 5,
    }),
    k.pos(levelMargin + 55, levelMargin + 30),
    k.color(66, 152, 211),
  ]);

  k.add([
    k.text("Press Enter to Continue", {
      size: 8,
      width: 200,
      font: titleFont,
    }),
    k.pos(levelMargin + 4, levelMargin + 140),
    k.color(255, 255, 255),
  ]);

  k.onKeyPress("enter", () => {
    onReturnToStart();
  });
});
