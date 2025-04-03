import { createContext, use, useCallback, useEffect, useState } from "react";
import { GameContext } from "./game-context";
import { ProfileContext } from "./profile-context";
import { TransactionContext } from "./transaction-context";
import { ScoreContext } from "./score-context";
import type { RollNumber } from "~/objects/roll-number";
import type { Score } from "~/objects/scorer";

/**
 * This context ties the rest of them together
 */
type Play = {
  play: (bet: number, dice: number) => void,
  score: Score | null,
};

const PlayContext = createContext<Play>({
  play: (_bet: number, _dice: number) => {},
  score: null,
});

const PlayProvider = ({
  children,
}: {
  children: any
}) => {
  const [bet, setBet] = useState(0);
  const [score, setScore] = useState<Score | null>(null);
  const gameContext = use(GameContext);
  const profileContext = use(ProfileContext);
  const transactionContext = use(TransactionContext);
  const scoreContext = use(ScoreContext);

  const play = useCallback((bet: number, dice: number) => {
    profileContext.debit(bet);
    transactionContext.addTransaction(
      transactionContext.createBet(bet, `Roll ${dice} for $${bet}.`)
    );

    setBet(bet);
    gameContext.roll(dice);
  }, [
    gameContext.roll,
    profileContext.debit,
    transactionContext.addTransaction,
    transactionContext.createBet,
    setBet,
  ]);

  useEffect(() => {
    if (gameContext.complete && gameContext.finalValues?.length > 0 && bet) {
      // Cast as RollNumber[] since the check for .length should mean it cannot be null
      const score = scoreContext.scoreRoll(bet, gameContext.finalValues as RollNumber[]);

      setScore(score);
      console.log(`Scored with payout $${score.payout}`, score);
      if (score.payout > 0) {
        profileContext.credit(score.payout);
        transactionContext.addTransaction(
          transactionContext.createWin(score.payout)
        );
      }
    }
  }, [
    bet,
    setScore,
    gameContext.finalValues,
    gameContext.complete,
    scoreContext.scoreRoll,
    profileContext.credit,
    transactionContext.addTransaction,
  ]);

  return <PlayContext value={ { play, score } }>{ children }</PlayContext>
};

export { PlayContext, PlayProvider };