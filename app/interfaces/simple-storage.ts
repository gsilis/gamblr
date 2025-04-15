export interface SimpleStorage<T> {
  save(value: T): void;
  retrieve(fallback: T): T;
}