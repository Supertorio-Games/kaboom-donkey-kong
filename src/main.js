import k from "./game";
import loadAssets from "./loadAssets";
import { StartSceneKey } from "./scenes/Start";
import { Level1SceneKey } from "./scenes/Level1";
import { Level2SceneKey } from "./scenes/Level2";
import { GameOverSceneKey } from "./scenes/GameOver";

const DEFAULT_GAME_STATE = {
  levelsCompleted: 0,
  score: 0,
  lives: 3,
};
let gameState;

loadAssets();

const updateState = (newState) => {
  gameState = newState;
};

const onStartGame = () => {
  gameState = {
    ...DEFAULT_GAME_STATE,
  };
  k.go(Level1SceneKey, { gameState, updateState, onLevelComplete, onGameOver });
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
  k.go(GameOverSceneKey, { gameState, onReturnToStart });
};

const onReturnToStart = () => {
  k.go(StartSceneKey, { onStartGame });
};

k.go(StartSceneKey, { onStartGame });
