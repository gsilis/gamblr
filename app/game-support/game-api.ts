import NullStorage from "~/adapters/null-storage";
import { type RawStorage } from "~/interfaces/raw-storage";

/**
 * The object passed to game programs that provide all of
 * the pieces needed to run the game.
 */
export class GameApi {
  static defaultValue: GameApi = (
    new GameApi(
      new NullStorage(),
      (_amount: number) => {},
      (_amount: number) => {}
    )
  );

  constructor(
    private _storage: RawStorage,
    private _deposit: (amount: number) => void,
    private _withdraw: (amount: number) => void,
  ) {}

  deposit(amount: number): void {
    return this._deposit(amount);
  }

  withdraw(amount: number): void {
    return this._withdraw(amount);
  }

  get storage(): RawStorage {
    return this._storage;
  }
}