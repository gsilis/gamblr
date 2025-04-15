import type { RawStorage } from "~/interfaces/raw-storage";

export default class NullStorage implements RawStorage {
  save(key: string, data: string): void {}
  retrieve(key: string, fallback: string): string {
      return '';
  }
  remove(key: string): void {}
}