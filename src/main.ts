import k from "@/game";
import loadAssets from "./loadAssets";
import { SCENE_KEY as StartSceneKey } from "@/scenes/startScene";
import { SCENE_KEY as Level1SceneKey } from "@/scenes/barrelsScene";
import { SCENE_KEY as Level2SceneKey } from "@/scenes/rivetsScene";
import { SCENE_KEY as GameOverSceneKey } from "@/scenes/gameOverScene";

type GameState = {
  levelsCompleted: number;
  score: number;
  lives: number;
};

const DEFAULT_GAME_STATE: GameState = {
  levelsCompleted: 0,
  score: 0,
  lives: 3,
};
let gameState;

loadAssets();

const updateState = (newState: GameState) => {
  gameState = newState;
};

const onStartGame = () => {
  gameState = {
    ...DEFAULT_GAME_STATE,
  };
  k.go(Level1SceneKey, { gameState, updateState, onLevelComplete, onGameOver });
};

const onLevelComplete = (levelState: GameState) => {
  gameState = levelState;
  k.play("victory");
  k.go(Level2SceneKey, {
    gameState,
    updateState,
    onCompleteLevel: onLevelComplete,
  });
};

const onGameOver = (levelState: GameState) => {
  gameState = levelState;
  k.go(GameOverSceneKey, { gameState, onReturnToStart });
};

const onReturnToStart = () => {
  k.go(StartSceneKey, { onStartGame });
};

k.go(StartSceneKey, { onStartGame });
