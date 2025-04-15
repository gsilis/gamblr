import type { RawStorage } from "~/interfaces/raw-storage";

export default class Storage implements RawStorage {
  constructor() {}

  save(key: string, data: string) {
    try {
      const stringified = JSON.stringify(data);

      window.localStorage.setItem(key, stringified);
    } catch (error) {}
  }

  retrieve(key: string, fallback: string): string {
    let value;

    try {
      value = window.localStorage.getItem(key);

      if (value !== null) {
        value = JSON.parse(value);
      }
    } catch (error) {}

    return value === void 0 || value === null ? fallback : value;
  }

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {}
  }
}