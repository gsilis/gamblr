import { type RollNumber } from "./game";
import { type Matcher } from "./matcher";
import { type Win } from "./win";

type Score = {
  bet: number,
  payout: number,
  wins: Win[],
};

export class Scorer {
  matchers: Matcher[] = [];

  addMatcher = (matcher: Matcher) => {
    this.matchers.push(matcher);
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