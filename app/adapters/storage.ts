export default class Storage {
  constructor() {}

  save(key: string, data: any) {
    try {
      globalThis.localStorage.setItem(key, data);
    } catch (error) {}
  }

  retrieve(key: string, fallback: any): any {
    let value;

    try {
      value = globalThis.localStorage.getItem(key);
    } catch (error) {
      value = fallback;
    }

    return value === void 0 ? fallback : value;
  }
}