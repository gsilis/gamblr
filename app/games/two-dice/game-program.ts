import { type GameProgram as GameProgramInterface } from "~/interfaces/game-program";
import { TWO_DICE } from "~/constants/game-type";
import Scorer, { type Bet } from "./objects/scorer";
import DieRoll from "~/game-support/die-roll";

export class GameProgram implements GameProgramInterface {
  name = TWO_DICE;
  _rolls: number = 0;
  _streak: number = 0;
  _lastWin: number = 0;
  _lastBet: number = 0;

  private _bet: number = 0;
  private _isRunning: boolean = false;
  private _dieRoll: DieRoll = new DieRoll([5, 10, 15, 20, 25, 30]);
  private _scorer: Scorer = new Scorer();

  setup(): void {
    this._isRunning = true;
  }

  destroy(): void {
    this._isRunning = false;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  get roll(): DieRoll {
    return this._dieRoll;
  }

  get rollCount(): number {
    return this._rolls;
  }

  get streak(): number {
    return this._streak;
  }

  get lastWin(): number {
    return this._lastWin;
  }

  get lastBet(): number {
    return this._lastBet;
  }

  play = (bet: number) => {
    this._bet = bet;
    this._rolls += 1;
    this._dieRoll.start(2);
  }

  /**
   * Score final values in die
   */
  score = (bets: Bet): number => {
    const values = this._dieRoll.values(2);
    const score = this._scorer.score(bets, values, this.streak);

    this._lastBet = Object.values(bets).reduce((acc, v) => acc + v, 0);

    if (score > 0) {
      this._streak += 1;
      this._lastWin = score;
    } else {
      this._streak = 0;
      this._lastWin = 0;
    }

    return score;
  }
}