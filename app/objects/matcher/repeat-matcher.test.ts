import { describe, test, expect } from "vitest";
import { RepeatMatcher } from "./repeat-matcher";
import { FIVES, ONES, THREES, TWOS } from "../match-type";

describe('RepeatMatcher', () => {
  describe('a value', () => {
    test('it matches 2 out of 2', () => {
      const matcher = new RepeatMatcher(2);

      expect(matcher.match([2, 2])).toEqual([
        { type: TWOS, dice: [0, 1], multiplier: 1.2 }
      ]);
    });

    test('it matches 3 out of 5', () => {
      const matcher = new RepeatMatcher(3);

      expect(matcher.match([3, 4, 3, 3, 5])).toEqual([
        { type: THREES, dice: [0, 2, 3], multiplier: 0.9 }
      ]);
    });

    test('it matches 2 out of 5', () => {
      const matcher = new RepeatMatcher(1);

      expect(matcher.match([2, 1, 1, 4, 5])).toEqual([
        { type: ONES, dice: [1, 2], multiplier: 0.6 }
      ]);
    });

    test('it matches 8 out of 8', () => {
      const matcher = new RepeatMatcher(5);

      expect(matcher.match([5, 5, 5, 5, 5, 5, 5, 5])).toEqual([
        { type: FIVES, dice: [0, 1, 2, 3, 4, 5, 6, 7], multiplier: 1.8 }
      ]);
    });

    test('it matches 2 out of 8', () => {
      const matcher = new RepeatMatcher(3);

      expect(matcher.match([1, 2, 2, 3, 5, 6, 3, 1])).toEqual([
        { type: THREES, dice: [3, 6], multiplier: 0.45 }
      ]);
    });
  });
});