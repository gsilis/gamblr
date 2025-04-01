import type { DicePosition } from "../dice-position";
import type { RollNumber } from "../game";
import { STRAIGHT, type MatchType } from "../match-type";
import type { Matcher } from "../matcher";
import type { Win } from "../win";

/**
 * A matcher that detects straights of at least 3
 */
export class StraightMatcher implements Matcher {
  type: MatchType = STRAIGHT;

  match = (values: RollNumber[]): Win[] => {
    const wins: Win[] = [];

    /**
     * This is an array of arrays containing the indices of values.
     * A roll with values:
     *    6, 5, 1, 2, 6, 6
     * 
     * Should result in an array with:
     *    [[2], [3], [], [], [1], [0, 4, 5]]
     * 
     * Then you can loop through the arrays shifting indices
     * off of them to accumulate straights.
     */
    const source = values.reduce((sources: number[][], value, index) => {
      sources[value - 1].push(index);

      return sources;
    }, [[], [], [], [], [], []]);

    let running = true;
    while (running) {
      let encountered = false;
      const sequence: (string | number)[] = [];

      source.forEach((arr, valueMinusOne) => {
        const roll = arr.shift();
        const present = roll !== void 0;
        
        // This keeps the loop going
        if (present) {
          encountered = true;
        }

        /**
         * Add the index number of '-' to the sequence array.
         * A straight would look like:
         *    '34--1324'
         */
        sequence.push(present ? roll : '-');
      });

      const matches = sequence.join('').match(/\d{3,}/g) || [];
      matches.forEach(match => {
        const positions = match.split('').map(i => parseInt(i) as DicePosition);

        wins.push({
          type: STRAIGHT,
          dice: positions,
          multiplier: 0.5 * positions.length,
        });
      });

      running = encountered;
    }

    return wins;
  }
}