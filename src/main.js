import k from "./game";
import loadAssets from "./loadAssets";
import { Level1SceneKey } from "./scenes/Level1";
import { Level2SceneKey } from "./scenes/Level2";

let gameState = {
  levelsCompleted: 0,
  score: 0,
  lives: 3,
};

loadAssets();

const updateState = (newState) => {
  gameState = newState;
};

const onLevelComplete = (levelState) => {
  gameState = levelState;
  k.play("victory");
  k.go(Level2SceneKey, {
    gameState,
    updateState,
    onCompleteLevel: onLevelComplete,
  });
};

const onGameOver = (levelState) => {
  gameState = levelState;
  console.log("Game Over", levelState);
};

k.go(Level1SceneKey, { gameState, updateState, onLevelComplete, onGameOver });
