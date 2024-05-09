import {GameMode} from "./common";

export const GAME_MODES = [
  GameMode.PATH,
  GameMode.LOCATIONS,
  GameMode.MEEPLE
];

export const getNextGameMode = (gameMode: GameMode) => {
  const modeIndex = GAME_MODES.indexOf(gameMode);
  const nextIndex = modeIndex === GAME_MODES.length - 1 ? 0 : modeIndex + 1;

  return GAME_MODES[nextIndex];
}