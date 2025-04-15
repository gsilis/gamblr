import { GameApi } from "~/game-support/game-api";
import type { GameProgram } from "./game-program";

export interface GameComponent {
  api: GameApi,
  program: GameProgram
}