import React, { use } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";
import './play.css';
import { GameRoll } from "~/components/game-roll/game-roll";
import { GameContext } from "~/contexts/game-context";
import PlayControls from "~/components/play-controls/play-controls";

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
  balance,
  credit,
  debit,
}: PlayProps) {
  const gameContext = use(GameContext);
  const games = gameContext.displayValues;
  const maxCycles = gameContext.maxCycles;
  const cycles = gameContext.cycles;
  const values = gameContext.displayValues;

  return <div className="play">
    <PlayControls balance={ balance } credit={ credit } debit={ debit } isRolling={ gameContext.isRolling } doRoll={ gameContext.roll } />
    <hr className="divider" />
    <div className="games">
      {
        games.map((game, index) => (
          <GameRoll
            key={ index }
            cycle={ cycles[index] }
            cycles={ maxCycles[index] }
            value={ values[index] !== null ? values[index] : 1 }
          />
        )) }
    </div>
  </div>;
}