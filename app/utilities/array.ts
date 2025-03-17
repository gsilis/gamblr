import { between } from "./number";

export function random(arr: any[], exclude?: any) {
  const max = arr.length;
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