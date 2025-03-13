import { useCallback, useState } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";
import './play.css';

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
  debit: (a: number, d: string) => void
};

export default function Play({
  city,
  balance,
  credit,
  debit,
}: PlayProps) {
  const [bet, setBet] = useState(0);
  const [rolls, setRolls] = useState(3);

  const addMoney = useCallback(() => {
    credit(100, 'Adding some money');
  }, [credit]);
  const removeMoney = useCallback(() => {
    debit(100, 'Removing some money');
  }, [debit]);

  return <div className="play">
    <div className="control-row bet">
      <label>Bet</label>
      <input type="text" value={ bet } />
      <button className="all">All</button>
      <button className="reset">Reset</button>
      <button className="add-1000">+1000</button>
      <button className="sub-1000">-1000</button>
      <button className="add-100">+100</button>
      <button className="sub-100">-100</button>
      <button className="add-10">+10</button>
      <button className="sub-10">-10</button>
      <button className="add-1">+1</button>
      <button className="sub-1">-1</button>
      <button className="sub-half">1 / 2</button>
      <button className="sub-third">1 / 3</button>
      <div className="spacer"></div>
    </div>
    <div className="control-row rolls">
      <label>Rolls</label>
      <input type="text" value={ rolls } />
      <button className="add-roll">+</button>
      <button className="sub-roll">-</button>
      <button className="do-roll">Roll</button>
      <div className="spacer"></div>
    </div>
    <div className="dice">
    </div>
  </div>;
}