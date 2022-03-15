import k from "../game";
import { levelMargin } from "../config";

export const StartSceneKey = "start-screen";

export const StartScene = k.scene(StartSceneKey, ({ onStartGame }) => {
  k.add([
    k.text("DONKEY KONG\n  KABOOM!", {
      size: 18,
      width: 150,
      font: "sink",
      lineSpacing: 5,
    }),
    k.pos(levelMargin + 22, levelMargin + 5),
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
      width: 140,
      font: "sink",
    }),
    k.pos(levelMargin + 25, levelMargin + 148),
    k.color(255, 255, 255),
  ]);

  k.add([
    k.text(
      "This game was created by @supertorio with Kaboom.js for educational purposes.",
      {
        size: 5,
        width: 150,
        font: "sink",
        lineSpacing: 1.5,
      }
    ),
    k.pos(levelMargin + 20, levelMargin + 160),
    k.color(195, 195, 195),
  ]);

  k.onKeyPress("enter", () => {
    onStartGame();
  });
});
