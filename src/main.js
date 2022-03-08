import k from "./game";

import { Level1SceneKey } from "./scenes/Level1";
import { Level2SceneKey } from "./scenes/Level2";

const { go, loadSpriteAtlas, loadSprite } = k;

loadSprite("donkeyKong", "donkey-kong.png", {
  sliceX: 2,
  anims: {
    idle: { from: 0, to: 0 },
    stomp: { from: 0, to: 1, loop: true },
  },
});

loadSprite("plumber", "mario.png", {
  sliceX: 7,
  anims: {
    idle: { from: 0, to: 0 },
    walk: { from: 0, to: 3, loop: true },
    jump: { from: 4, to: 4 },
    climb: { from: 5, to: 6, loop: true },
    climbIdle: { from: 5, to: 5 },
  },
});

loadSprite("hammer", "hammer.png", {
  sliceX: 4,
});

loadSprite("pauline", "pauline.png");

loadSprite("barrel", "barrel.png", {
  sliceX: 3,
  anims: {
    roll: { from: 0, to: 1, loop: true },
    fall: { from: 2, to: 2 },
  },
});

loadSprite("fireball", "fireball.png");

loadSpriteAtlas("levels.png", {
  level1: {
    x: 0,
    y: 0,
    width: 192,
    height: 160,
  },
  level2: {
    x: 192,
    y: 0,
    width: 192,
    height: 160,
  },
});

loadSprite("numbers", "numbers.png", {
  sliceX: 20,
});

let gameState = {
  levelsCompleted: 0,
  score: 0,
  lives: 3,
};

const updateState = (newState) => {
  gameState = newState;
};

const onLevelComplete = (levelState) => {
  gameState = levelState;
  go(Level2SceneKey, {
    gameState,
    updateState,
    onCompleteLevel: onLevelComplete,
  });
};

const onGameOver = (levelState) => {
  gameState = levelState;
  console.log("Game Over", levelState);
};

go(Level1SceneKey, { gameState, updateState, onLevelComplete, onGameOver });
