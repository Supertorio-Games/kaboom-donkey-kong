import k from "@/game";
import { levelMargin, barrelSpawnDelay, levelConfig } from "@/config";
import { barrelsMap } from "@/entities/barrelsMap";
import { donkeyKong } from "@/entities/donkeyKong";
import { pauline } from "@/entities/pauline";
import { plumber, plumberTag } from "@/entities/plumber";
import { barrelTag } from "@/entities/barrel";
import livesDisplayManager from "@/managers/livesDisplayManager";
import numberBar, { NUMBER_BAR_TYPE } from "@/managers/numberBarManager";
import barrelManager from "@/managers/barrelManager";
import volumeManager from "@/managers/volumeManager";

export const SCENE_KEY = "level1";

const barrelSpawnPosition = k.vec2(levelMargin + 5, levelMargin + 48);
const donkeyKongPos = k.vec2(levelMargin + 2, levelMargin + 12);
const paulinePos = k.vec2(85, levelMargin + 15);
const pluberSpawnPos = k.vec2(levelMargin + 30, k.height() - levelMargin - 2);
const lifeTokenPos = k.vec2(k.width() - levelMargin, 20 + levelMargin);
const numberBarPos = k.vec2(k.width() - levelMargin - 80, levelMargin);
const goalPos = k.vec2(levelMargin + 88, levelMargin + 35);

const startTime = 5000;
const levelTick = 2000;

export const Level1Scene = k.scene(
  SCENE_KEY,
  async ({ gameState, onLevelComplete, onGameOver }) => {
    let levelTimer: ReturnType<typeof setInterval>;
    volumeManager(k);

    // Level Map
    k.add(barrelsMap());

    // Life Counter
    const lives = livesDisplayManager(
      gameState.lives,
      levelConfig.level1.levelColor,
      lifeTokenPos
    );
    lives.addLifeMarkers();

    // Time Counter
    const timerBar = numberBar(startTime, NUMBER_BAR_TYPE.TIMER, numberBarPos);

    // Pauline
    k.add(pauline(paulinePos));

    // DK
    k.add(donkeyKong(donkeyKongPos));

    const scoreBarrel = () => {
      gameState.score += 500;
      k.play("over");
    };

    // Plumber
    const mario = k.add(
      plumber(pluberSpawnPos, levelConfig.level1, {
        onScoreBarrel: scoreBarrel,
      })
    );

    // Barrels
    const barrelsMngr = barrelManager(barrelSpawnPosition, barrelSpawnDelay);

    // Goal
    k.add([
      k.pos(goalPos),
      k.rect(8, 1),
      k.area(),
      k.color(0, 0, 0), // TODO: Can we make transparent collision rectangles
      k.body({
        solid: false,
        weight: 0,
      }),
      "GOAL",
    ]);

    // Handle collisions
    k.onCollide(plumberTag, barrelTag, () => {
      loseLife();
    });

    k.onCollide(plumberTag, "GOAL", () => {
      mario.stopAudio();
      onLevelComplete();
    });

    const resetLevel = () => {
      clearInterval(levelTimer);
      barrelsMngr.stopSpawing();
      mario.moveTo(pluberSpawnPos);
      timerBar.updateNumber(startTime);
    };

    const loseLife = () => {
      lives.removeLife();
      gameState.lives--;
      mario.stopAudio();
      k.play("die");

      // Reset Level
      if (gameState.lives > 0) {
        resetLevel();
        startLevel();
      } else {
        clearInterval(levelTimer);
        onGameOver(gameState);
      }
    };

    const startLevel = () => {
      let timeRemaining = startTime;
      levelTimer = setInterval(() => {
        timeRemaining -= 100;
        timerBar.updateNumber(timeRemaining);
        if (timeRemaining <= 0) {
          loseLife();
        }
      }, levelTick);

      // Barrels
      barrelsMngr.startSpawning();
    };

    startLevel();
  }
);
