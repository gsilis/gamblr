import { describe, test, expect } from "vitest";
import { StraightMatcher } from "./straight-matcher";
import { STRAIGHT } from "../match-type";

const getInstance = () => {
  return new StraightMatcher();
};

describe('StraightMatcher', () => {
  describe('.match', () => {
    test('it ignores sequences less than 3', () => {
      const subject = getInstance();

      expect(subject.match([4, 5, 1, 2, 1, 1])).toEqual([]);
    });

    test('it matches 3 in order', () => {
      const subject = getInstance();

      expect(subject.match([1, 2, 3, 1, 1, 2])).toEqual([
        { type: STRAIGHT, dice: [0, 1, 2], multiplier: 1.5 }
      ]);
    });

    test('it matches 3 out of order', () => {
      const subject = getInstance();

      expect(subject.match([3, 1, 5, 5, 4, 1, 1, 1])).toEqual([
        { type: STRAIGHT, dice: [0, 4, 2], multiplier: 1.5 }
      ]);
    });

    test('it matches multiple runs', () => {
      const subject = getInstance();

      expect(subject.match([1, 2, 3, 3, 4, 4, 5, 2])).toEqual([
        { type: STRAIGHT, dice: [0, 1, 2, 4, 6], multiplier: 2.5 },
        { type: STRAIGHT, dice: [7, 3, 5], multiplier: 1.5 },
      ]);
    });

    test('it matches one through six', () => {
      const subject = getInstance();

      expect(subject.match([3, 6, 4, 5, 2, 1])).toEqual([
        { type: STRAIGHT, dice: [5, 4, 0, 2, 3, 1], multiplier: 3 }
      ]);
    });

    test('it matches 2 runs out of 9 dice', () => {
      const subject = getInstance();

      expect(subject.match([3, 2, 4, 1, 5, 6, 3, 2, 1])).toEqual([
        { type: STRAIGHT, dice: [3, 1, 0, 2, 4, 5], multiplier: 3 },
        { type: STRAIGHT, dice: [8, 7, 6], multiplier: 1.5 }
      ]);
    });
  });
});