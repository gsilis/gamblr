import { type GameProgram as GameProgramInterface } from "~/interfaces/game-program";
import { TWO_DICE } from "~/constants/game-type";
import { GameApi } from "~/game-support/game-api";

export class GameProgram implements GameProgramInterface {
  name = TWO_DICE;

  private _isRunning: boolean = false;

  setup(): void {
    this._isRunning = true;
  }

  destroy(): void {
    this._isRunning = false;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }
}