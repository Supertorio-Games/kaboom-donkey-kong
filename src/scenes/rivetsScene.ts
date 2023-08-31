import k from "@/game";
import { levelMargin, barrelSpawnDelay, levelConfig } from "@/config";
import { rivitsMap } from "@/entities/rivitsMap";
import { donkeyKong } from "@/entities/donkeyKong";
import { pauline } from "@/entities/pauline";
import { plumber, plumberTag } from "@/entities/plumber";
import livesDisplayManager from "@/managers/livesDisplayManager";
import numberBar, { NUMBER_BAR_TYPE } from "@/managers/numberBarManager";
import volumeManager from "@/managers/volumeManager";

export const SCENE_KEY = "level1";

const donkeyKongPos = k.vec2(levelMargin + 2, levelMargin + 30);
const paulinePos = k.vec2(80, levelMargin + 32);
const pluberSpawnPos = k.vec2(levelMargin + 30, k.height() - levelMargin - 5);
const lifeTokenPos = k.vec2(k.width() - levelMargin, 20 + levelMargin);
const numberBarPos = k.vec2(k.width() - levelMargin - 80, levelMargin);

const startTime = 5000;
const levelTick = 2000;

export const Level1Scene = k.scene(
  SCENE_KEY,
  ({ gameState, onLevelComplete, onGameOver }) => {
    console.log(gameState);
    let levelTimer: ReturnType<typeof setInterval>;
    volumeManager(k);

    // Level Map
    k.add(rivitsMap());

    // Life Counter
    const lives = livesDisplayManager(
      gameState.lives,
      levelConfig.level2.levelColor,
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
      plumber(pluberSpawnPos, levelConfig.level2, {
        onScoreBarrel: scoreBarrel,
      })
    );

    // Handle collisions
    // k.onCollide(plumberTag, barrelTag, () => {
    //   loseLife();
    // });

    k.onCollide(plumberTag, "GOAL", () => {
      mario.stopAudio();
      onLevelComplete();
    });

    const resetLevel = () => {
      clearInterval(levelTimer);
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
    };

    startLevel();
  }
);
