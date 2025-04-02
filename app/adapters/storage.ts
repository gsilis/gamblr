export default class Storage {
  constructor() {}

  save(key: string, data: any) {
    try {
      const stringified = JSON.stringify(data);

      globalThis.localStorage.setItem(key, stringified);
    } catch (error) {}
  }

  retrieve(key: string, fallback: any): any {
    let value;

    try {
      value = globalThis.localStorage.getItem(key);

      if (value !== null) {
        value = JSON.parse(value);
      }
    } catch (error) {}

    return value === void 0 || value === null ? fallback : value;
  }
}