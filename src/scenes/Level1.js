import k from "../game";
import { levelMargin, barrelSpawnDelay, levelConfig } from "../config";
import { barrelsMap } from "../entities/barrelsMap";
import { barrel, barrelTag } from "../entities/barrel";
import { donkeyKong } from "../entities/donkeyKong";
import { pauline } from "../entities/pauline";
import { plumber, plumberTag } from "../entities/plumber";
import livesCounter from "../entities/livesCounter";
import numberBar, { NUMBER_BAR_TYPE } from "../entities/numberBar";

export const Level1SceneKey = "level1";

let shouldSpawn = true;

const barrelSpawnPosition = k.vec2(levelMargin + 5, levelMargin + 48);
const donkeyKongPos = k.vec2(levelMargin + 2, levelMargin + 12);
const paulinePos = k.vec2(85, levelMargin + 15);
const pluberSpawnPos = k.vec2(levelMargin + 30, k.height() - levelMargin - 2);
const lifeTokenPos = k.vec2(k.width() - levelMargin, 20 + levelMargin);
const numberBarPos = k.vec2(k.width() - levelMargin - 80, levelMargin);

const startTime = 5000;
const levelTick = 2000;

const spawnBarrel = () => {
  if (shouldSpawn) {
    k.add(barrel(barrelSpawnPosition));
  }
  k.wait(barrelSpawnDelay, () => {
    spawnBarrel();
  });
};

export const Level1Scene = k.scene(
  Level1SceneKey,
  async ({ gameState, updateState, onLevelComplete, onGameOver }) => {
    let levelTimer;

    // Level Map
    k.add(barrelsMap());

    // Life Counter
    const lives = new livesCounter(
      gameState.lives,
      levelConfig.level1.levelColor,
      lifeTokenPos
    );
    lives.addLifeMarkers();

    // Time Counter
    const timerBar = new numberBar(
      startTime,
      NUMBER_BAR_TYPE.TIMER,
      numberBarPos
    );

    // Pauline
    k.add(pauline(paulinePos));

    // DK
    k.add(donkeyKong(donkeyKongPos));

    // Plumber
    const mario = k.add(plumber(pluberSpawnPos, levelConfig.level1));

    // Handle collisions
    k.onCollide(plumberTag, barrelTag, (gameObj1, gameObj2, col) => {
      // console.log("mario + barrel", gameObj1, gameObj2, col);
      loseLife();
    });

    const resetLevel = () => {
      clearInterval(levelTimer);
      // TODO Reset Barrels
      mario.moveTo(pluberSpawnPos);
      timerBar.updateNumber(startTime);
    };

    const loseLife = () => {
      lives.removeLife();
      gameState.lives--;

      // Reset Level
      if (gameState.lives > 0) {
        resetLevel();
        startLevel();
      } else {
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
      spawnBarrel();
    };

    startLevel();
  }
);
