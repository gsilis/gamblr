import type { GameProgram } from "./game-program";
import type { StorageFactory } from "~/factories/storage-factory";

export interface GameComponent {
  balance: number,
  deposit(amount: number): void,
  withdraw(amount: number): void,

  storageFactory: StorageFactory,

  program: GameProgram,
}