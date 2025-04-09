import { describe, expect, test } from "vitest";
import { currency } from "./currency";

describe('currency', () => {
  test('works with one digit', () => {
    expect(currency(1)).toEqual('$1');
  });

  test('works with two digits', () => {
    expect(currency(12)).toEqual('$12');
  });

  test('works with three digits', () => {
    expect(currency(123)).toEqual('$123');
  });

  test('works with four digits', () => {
    expect(currency(1234)).toEqual('$1,234');
  });

  test('works with five digits', () => {
    expect(currency(12345)).toEqual('$12,345');
  });

  test('works with very large numbers', () => {
    expect(currency(1234567890123456)).toEqual('$1,234,567,890,123,456');
  });
});