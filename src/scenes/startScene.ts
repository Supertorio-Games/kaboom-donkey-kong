import k from "@/game";
import { levelMargin, titleFont, bodyFont } from "@/config";

export const SCENE_KEY = "start-screen";

export default k.scene(SCENE_KEY, ({ onStartGame }) => {
  k.add([
    k.text("DONKEY KONG\n  KABOOM!", {
      size: 17,
      width: 200,
      font: titleFont,
      lineSpacing: 5,
    }),
    k.pos(levelMargin + 2, levelMargin + 5),
    k.color(66, 152, 211),
  ]);

  k.add([
    k.sprite("startGraphic"),
    k.scale(0.7),
    k.pos(levelMargin + 55, levelMargin + 60),
  ]);

  k.add([
    k.text("Press Enter to Continue", {
      size: 8,
      font: bodyFont,
    }),
    k.pos(levelMargin + 12, levelMargin + 148),
    k.color(255, 255, 255),
  ]);

  k.onKeyPress("enter", () => {
    onStartGame();
  });
});
