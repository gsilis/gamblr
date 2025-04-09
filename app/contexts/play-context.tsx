import { createContext, use, useCallback, useEffect, useRef, useState } from "react";
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
};

const PlayContext = createContext<Play>({
  play: (_bet: number, _dice: number) => {},
});

const PlayProvider = ({
  children,
}: {
  children: any
}) => {
  const gameContext = use(GameContext);
  const profileContext = use(ProfileContext);
  const transactionContext = use(TransactionContext);
  const scoreContext = use(ScoreContext);

  const play = useCallback((bet: number, dice: number) => {
    profileContext.debit(bet);
    transactionContext.addTransaction(
      transactionContext.createBet(bet, `Roll ${dice} for $${bet}.`)
    );

    gameContext.roll(dice, bet);
  }, [
    gameContext.roll,
    profileContext.debit,
    transactionContext.addTransaction,
    transactionContext.createBet,
  ]);

  return <PlayContext value={ { play } }>{ children }</PlayContext>
};

export { PlayContext, PlayProvider };