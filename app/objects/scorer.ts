import { type RollNumber } from "./game";
import { type Matcher } from "./matcher";
import { type Win } from "./win";

type Score = {
  bet: number,
  payout: number,
  wins: Win[],
};

class Scorer {
  matchers: Matcher[] = [];

  addMatcher = (matcher: Matcher) => {
    this.matchers.push(matcher);
  }

  calculate = (bet: number, values: RollNumber[]): Score => {
    const wins: Win[] = [];
    const betPerDie = bet / values.length;

    this.matchers.forEach((matcher) => {
      wins.push(...matcher.match(betPerDie, values));
    });

    const payout = wins.reduce((multiplier, win) => {
      return multiplier + win.multiplier;
    }, 1);

    return {
      bet,
      payout: betPerDie * payout,
      wins,
    };
  }
}

export default Scorer;