import React, { useCallback, useState } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";
import './play.css';
import Roll from "../roll/roll";

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
  const updateRolls = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newRolls = parseInt(event?.target?.value);
    setRolls(newRolls);
  }, [setRolls]);
  const increaseRolls = useCallback(() => {
    setRolls(r => r + 1);
  }, [setRolls]);
  const decreaseRolls = useCallback(() => {
    setRolls(r => r - 1);
  }, [setRolls]);
  const updateBet = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseInt(event?.target?.value);
    setBet(newBet);
  }, [setBet]);
  const pushButtonBet = useCallback((amount: number) => {
    setBet(b => b + amount);
  }, [setBet]);
  const betAll = useCallback(() => {
    setBet(balance);
  }, [setBet, balance]);
  const betNone = useCallback(() => {
    setBet(0);
  }, [setBet]);

  return <div className="play">
    <div className="control-row bet">
      <label>Bet</label>
      <input type="text" value={ bet } onChange={ updateBet } />
      <button className="all" onClick={ betAll }>All</button>
      <button className="reset" onClick={ betNone }>Reset</button>
      <button className="add-1000" onClick={ () => pushButtonBet(1000) }>+1000</button>
      <button className="sub-1000" onClick={ () => pushButtonBet(-1000) }>-1000</button>
      <button className="add-100" onClick={ () => pushButtonBet(100) }>+100</button>
      <button className="sub-100" onClick={ () => pushButtonBet(-100) }>-100</button>
      <button className="add-10" onClick={ () => pushButtonBet(10) }>+10</button>
      <button className="sub-10" onClick={ () => pushButtonBet(-10) }>-10</button>
      <button className="add-1" onClick={ () => pushButtonBet(1) }>+1</button>
      <button className="sub-1" onClick={ () => pushButtonBet(-1) }>-1</button>
      <button className="sub-half" onClick={ () => pushButtonBet(balance / 2) }>1 / 2</button>
      <button className="sub-third" onClick={ () => pushButtonBet(balance / 3) }>1 / 3</button>
      <div className="spacer"></div>
    </div>
    <div className="control-row rolls">
      <label>Rolls</label>
      <input type="text" value={ rolls } onChange={ updateRolls } />
      <button className="add-roll" onClick={ increaseRolls }>+</button>
      <button className="sub-roll" onClick={ decreaseRolls }>-</button>
      <button className="do-roll">Roll</button>
      <div className="spacer"></div>
    </div>
    <hr className="divider" />
    <div className="games">
    </div>
  </div>;
}