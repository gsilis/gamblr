import NullStorage from "~/adapters/null-storage";
import type { RawStorage } from "~/interfaces/raw-storage";

/**
 * The object passed to game programs that provide all of
 * the pieces needed to run the game.
 */
export class GameApi {
  static defaultValue: GameApi = (
    new GameApi(new NullStorage())
  );

  constructor(
    private storage: RawStorage,
  ) {}
}