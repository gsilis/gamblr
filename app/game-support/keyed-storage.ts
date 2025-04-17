import type { RawStorage } from "~/interfaces/raw-storage";
import { type SimpleStorage } from "~/interfaces/simple-storage";

export class KeyedStorage<T> implements SimpleStorage<T> {
  constructor(
    private storage: RawStorage,
    private key: string,
    private valueToString: (value: T) => string,
    private valueFromString: (value: string) => T,
  ) {}

  save = (value: T) => {
    const convertedValue = this.valueToString(value);
    return this.storage.save(this.key, convertedValue);
  }

  retrieve = (fallback: T): T => {
    const rawValue = this.storage.retrieve(this.key, '');
    let value: T;

    if (rawValue === void 0 || rawValue === null) {
      value = fallback
    } else {
      value = this.valueFromString(rawValue);
    }

    return value;
  }
}