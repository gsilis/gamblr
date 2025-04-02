import { type RollNumber } from "~/objects/roll-number";
import { type Matcher } from "~/objects/matcher";
import { type Win } from "~/objects/win";

export type Score = {
  bet: number,
  payout: number,
  wins: Win[],
};

export class Scorer {
  matchers: Matcher[] = [];

  addMatcher = (matcher: Matcher) => {
    this.matchers.indexOf(matcher) == -1 && this.matchers.push(matcher);
  }

  removeMatcher = (matcher: Matcher) => {
    this.matchers = this.matchers.filter(m => m !== matcher);
  }

  calculate = (bet: number, values: RollNumber[]): Score => {
    const wins: Win[] = [];
    const betPerDie = bet / values.length;

    this.matchers.forEach((matcher) => {
      wins.push(...matcher.match(values));
    });

    const payout = wins.reduce((multiplier, win) => {
      return multiplier + win.multiplier;
    }, 0);

    return {
      bet,
      payout: betPerDie * payout,
      wins,
    };
  }
}