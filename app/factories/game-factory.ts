import { GameConfig } from "~/constants/game-config";
import type { GameType } from "~/constants/game-type";
import { GameApi } from "~/game-support/game-api";
import type { GameProgram } from "~/interfaces/game-program";

export class GameFactory {
  static default(): GameFactory {
    return new GameFactory();
  }

  constructor() {}

  createFor(gameName: GameType): GameProgram {
    const setting = GameConfig[gameName];
    const GameData = setting.data;
    const program = new GameData();
    program.setup();

    return program;
  }
}