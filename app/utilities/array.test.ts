import { describe, it, expect } from "vitest";
import { random, range, blank } from "./array";

describe('array', () => {
  describe('random', () => {
    it('returns a value from a source array', () => {
      const values = ['thing', 'here', 'and', 'there'];

      expect(random(values)).toBeOneOf(values);
    });
  });

  describe('range', () => {
    it('creates an array populated by index values', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('blank', () => {
    it('fills an array', () => {
      expect(blank(3)).toEqual([void 0, void 0, void 0]);
    });

    it('accepts filler values', () => {
      const filler = 'test';

      expect(blank(3, filler)).toEqual([filler, filler, filler]);
    });
  });
});