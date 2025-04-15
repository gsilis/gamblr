import NullStorage from "~/adapters/null-storage";
import { KeyedStorage } from "~/game-support/keyed-storage";
import type { SimpleStorage } from "~/interfaces/simple-storage";
import type { RawStorage } from "~/interfaces/raw-storage";

export class StorageFactory {
  static default(): StorageFactory {
    return new StorageFactory(
      new NullStorage()
    );
  }

  constructor(
    private storage: RawStorage
  ) {}

  createNumericKeyedStorage(key: string): KeyedStorage<number> {
    return new KeyedStorage<number>(this.storage, key, JSON.stringify, parseInt);
  }

  createStringKeyedStorage<T = string>(key: string, toStorage: (v: T) => string, fromStorage: (v: string) => T): KeyedStorage<T> {
    return new KeyedStorage<T>(this.storage, key, toStorage, fromStorage);
  }
}