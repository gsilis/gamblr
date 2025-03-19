import React, { use, useCallback, useMemo, useState } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";
import './play.css';
import { RollProvider } from "~/roll-context";
import { GameRoll } from "../game-roll/game-roll";
import { GameContext } from "~/game-context";
import { range } from "~/utilities/array";
import PlayControls from "../play-controls/play-controls";

const MIN_ROLLS = 2;
const MAX_ROLLS = 10;

type PlayProps = {
  city: CityKey,
  balance: number,
  transactions: TransactionType[],
  addTransaction: (t: TransactionType) => void,
  createBank: (a: number, d: string) => TransactionType,
  createPawn: (a: number, d: string) => TransactionType,
  createWin: (a: number) => TransactionType,
  createBet: (a: number, d: string) => TransactionType,
  credit: (a: number, d: string) => void,
  debit: (a: number, d: string) => void,
};

export default function Play({
  city,
  balance,
  credit,
  debit,
}: PlayProps) {
  const gameContext = use(GameContext);
  const mappableRolls = range(gameContext.rolls);

  return <div className="play">
    <PlayControls balance={ balance } credit={ credit } debit={ debit } />
    <hr className="divider" />
    <div className="games">
      { mappableRolls.map((roll) => (
        <RollProvider
          lockInValue={ (value) => gameContext.setValue(roll, value) }
          key={ roll }>
          <GameRoll />
        </RollProvider>
      )) }
    </div>
  </div>;
}