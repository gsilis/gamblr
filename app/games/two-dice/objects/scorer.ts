import type { DICE_VALUE } from "~/game-support/dice-roll";

export interface Bet {
  pair: number,
  sum7: number,
  sumSub7: number,
  sumPlus7: number,
  sequence: number,
  one: number,
  two: number,
  three: number,
  four: number,
  five: number,
  six: number,
}

const multipliers = {
  pair: 10,
  sum7: 5,
  sumSub7: 4,
  sumPlus7: 8,
  sequence: 3,
  one: 1.5,
  two: 1.5,
  three: 1.5,
  four: 1.5,
  five: 1.5,
  six: 1.5,
};

class Scorer {
  score(bets: Bet, values: DICE_VALUE[], streak: number): number {
    let winnings = 0;

    [
      { bet: bets.pair, multi: multipliers.pair, applicable: this.isPair(values) },
      { bet: bets.sum7, multi: multipliers.sum7, applicable: this.isSum7(values) },
      { bet: bets.sumSub7, multi: multipliers.sumSub7, applicable: this.isSumSub7(values) },
      { bet: bets.sumPlus7, multi: multipliers.sumPlus7, applicable: this.isSumPlus7(values) },
      { bet: bets.sequence, multi: multipliers.sequence, applicable: this.isSequence(values) },
      { bet: bets.one, multi: multipliers.one, applicable: this.isOne(values) },
      { bet: bets.two, multi: multipliers.two, applicable: this.isTwo(values) },
      { bet: bets.three, multi: multipliers.three, applicable: this.isThree(values) },
      { bet: bets.four, multi: multipliers.four, applicable: this.isFour(values) },
      { bet: bets.five, multi: multipliers.five, applicable: this.isFive(values) },
      { bet: bets.six, multi: multipliers.six, applicable: this.isSix(values) },
    ].forEach(({ bet, multi, applicable }) => {
      if (applicable) {
        winnings += bet * (multi + streak);
      }
    });

    return Math.floor(winnings);
  }

  private isPair(values: DICE_VALUE[]): boolean {
    return values[0] === values[1];
  }

  private isSum7(values: DICE_VALUE[]): boolean {
    return (values[0] + values[1]) === 7;
  }

  private isSumSub7(values: DICE_VALUE[]): boolean {
    return (values[0] + values[1]) < 7;
  }

  private isSumPlus7(values: DICE_VALUE[]): boolean {
    return (values[0] + values[1]) > 7;
  }

  private isSequence(values: DICE_VALUE[]): boolean {
    return Math.abs(values[0] - values[1]) == 1;
  }

  private isOne(values: DICE_VALUE[]): boolean {
    return this.has(values, 1);
  }

  private isTwo(values: DICE_VALUE[]): boolean {
    return this.has(values, 2);
  }

  private isThree(values: DICE_VALUE[]): boolean {
    return this.has(values, 3);
  }

  private isFour(values: DICE_VALUE[]): boolean {
    return this.has(values, 4);
  }

  private isFive(values: DICE_VALUE[]): boolean {
    return this.has(values, 5);
  }

  private isSix(values: DICE_VALUE[]): boolean {
    return this.has(values, 6);
  }

  private has(values: DICE_VALUE[], needle: number): boolean {
    return values[0] === needle || values[1] === needle;
  }
}

export default Scorer;