import type { DicePosition } from "../dice-position";
import type { RollNumber } from "../game";
import { FIVES, type MatchType, ONES, FOURS, SIXES, THREES, TWOS } from "../match-type";
import type { Matcher } from "../matcher";
import type { Win } from "../win";

/**
 * A matcher that looks for repeats of the passed
 * in value.
 */
export class RepeatMatcher implements Matcher {
  type: MatchType;

  constructor(
    private value: RollNumber
  ) {
    this.type = this.typeFor(value);
  }

  match(values: RollNumber[]): Win[] {
    // How many times does the value appear
    const wins: Win[] = [];
    const matches = values.reduce<DicePosition[]>((acc, value, index) => {
      if (value === this.value) {
        acc.push(index as DicePosition);
      }

      return acc;
    }, []);

    // What proportion is the count of all the dice?
    const involved = matches.length / values.length;

    // Only 2 of a kind count as a match
    if (matches.length > 1) {
      wins.push({
        type: this.type,
        dice: matches,
        multiplier: parseFloat(((matches.length * 0.1) + involved).toPrecision(3))
      });
    }

    return wins;
  }

  private typeFor(value: RollNumber): MatchType {
    switch (value) {
      case 1: return ONES;
      case 2: return TWOS;
      case 3: return THREES;
      case 4: return FOURS;
      case 5: return FIVES;
      case 6: return SIXES;
    }
  }
}