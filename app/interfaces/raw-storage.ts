export interface RawStorage {
  save(key: string, data: string): void;
  retrieve(key: string, fallback: string): string;
  remove(key: string): void;
}