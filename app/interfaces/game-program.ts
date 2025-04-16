import { type GameType } from "~/constants/game-type";
import type { GameApi } from "~/game-support/game-api";

/**
 * The root object for a specific game. It should contain
 * the state for the game and provide hooks for React to
 * get info from it.
 */
export interface GameProgram {
  name: GameType;

  setup(): void;
  destroy(): void;

  get isRunning(): boolean;
}