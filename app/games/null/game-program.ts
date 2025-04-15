import { type GameProgram as GameProgramInterface } from "~/interfaces/game-program";
import { NULL } from "~/constants/game-type";
import { GameApi } from "~/game-support/game-api";

/**
 * A game program meant to satisfy the compiler.
 * This game program is not meant to be used.
 */
export class GameProgram implements GameProgramInterface {
  name = NULL;

  private _api: GameApi = GameApi.defaultValue;

  setup(api: GameApi): void {
    console.warn('Null game program is not meant to be used.');
  }

  destroy(): void {}

  get api(): GameApi {
    return this._api;
  }

  get isRunning(): boolean {
    return false;
  }
}