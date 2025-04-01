import { describe, test, expect, vi } from "vitest";
import { Scorer } from "./scorer";
import type { Matcher } from "./matcher";
import type { RollNumber } from "./game";
import type { Win } from "./win";
import { RepeatMatcher } from "./matcher/repeat-matcher";
import { ONES, type MatchType } from "./match-type";

const getInstance = () => {
  return new Scorer();
};

const getMatcher = () => {
  return new FakeMatcher();
};

class FakeMatcher implements Matcher {
  type: MatchType = 'straight';
  match(_: RollNumber[]): Win[] { return []; }
}

describe('Scorer', () => {
  describe('.addMatcher', () => {
    test('it adds matchers', () => {
      const subject = getInstance();
      const matcher = getMatcher();

      expect(subject.matchers).toEqual([]);
      subject.addMatcher(matcher);
      expect(subject.matchers).toContain(matcher);
    });
  });

  describe('.calculate', () => {
    test('it passes values to its matchers', () => {
      const subject = getInstance();
      const matcher = getMatcher();
      const roll: RollNumber[] = [1, 1, 5, 3, 4, 1];
      const bet = 100;

      vi.spyOn(matcher, 'match');
      subject.addMatcher(matcher);

      const result = subject.calculate(bet, roll);

      expect(result.bet).toEqual(bet);
      expect(result.payout).toEqual(0);
      expect(result.wins).toEqual([]);
    });

    test('it applies payout to the bet', () => {
      const subject = getInstance();
      const matcher = getMatcher();
      const roll: RollNumber[] = [1, 1];
      const bet = 100;
      const win: Win = { type: ONES, dice: [0, 1], multiplier: 2 };

      const matchSpy = vi.spyOn(matcher, 'match');
      matchSpy.mockReturnValue([win]);
      subject.addMatcher(matcher);
      const result = subject.calculate(bet, roll);

      expect(result.bet).toEqual(bet);
      expect(result.payout).toEqual(100);
      expect(result.wins).toEqual([win]);
    });
  });
});