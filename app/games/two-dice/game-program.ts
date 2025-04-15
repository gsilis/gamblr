import { type GameProgram as GameProgramInterface } from "~/interfaces/game-program";
import { TWO_DICE } from "~/constants/game-type";
import { GameApi } from "~/game-support/game-api";

export class GameProgram implements GameProgramInterface {
  name = TWO_DICE;

  private _api: GameApi = GameApi.defaultValue;
  private _isRunning: boolean = false;

  setup(api: GameApi): void {
    this._api = api;
    this._isRunning = true;
  }

  destroy(): void {
    this._isRunning = false;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  get api(): GameApi {
    return this._api;
  }
}