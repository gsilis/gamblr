import { between } from "./number";

export function random<T = any>(arr: T[], exclude?: T): T {
  const max = arr.length - 1;
  const hasExclude = exclude !== void 0 && arr.includes(exclude);
  let value = arr[between(0, max)];

  while (hasExclude && value === exclude) {
    value = arr[between(0, max)];
  }

  return value;
}

export function range(size: number): number[] {
  let arr = [];

  while (arr.length < size) {
    arr.push(arr.length);
  }

  return arr;
}

export function blank<T>(size: number, filler: any = void 0): T[] {
  let arr: T[] = [];

  while (arr.length < size) {
    arr.push(filler);
  }

  return arr;
}