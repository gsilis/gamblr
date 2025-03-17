import React, { use, useCallback, useMemo, useState } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";
import './play.css';
import { RollProvider } from "~/roll-context";
import { GameRoll } from "../game-roll/game-roll";
import { GameContext } from "~/game-context";
import { range } from "~/utilities/array";

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

  const [bet, setBet] = useState(0);
  const [rolls, setRolls] = useState(MIN_ROLLS);

  const addMoney = useCallback(() => {
    credit(100, 'Adding some money');
  }, [credit]);
  const removeMoney = useCallback(() => {
    debit(100, 'Removing some money');
  }, [debit]);
  const updateRolls = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRolls(() => parseInt(event?.target?.value));
  }, [setRolls]);
  const increaseRolls = useCallback(() => {
    setRolls(r => {
      return r + 1 < MAX_ROLLS ? r + 1 : r;
    });
  }, [setRolls]);
  const decreaseRolls = useCallback(() => {
    setRolls(r => {
      return r - 1 > MIN_ROLLS ? r - 1 : r;
    });
  }, [setRolls]);
  const updateBet = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseInt(event?.target?.value);
    setBet(newBet);
  }, [setBet]);
  const pushButtonBet = useCallback((amount: number) => {
    setBet(b => Math.round(b + amount));
  }, [setBet]);
  const betAll = useCallback(() => {
    setBet(balance);
  }, [setBet, balance]);
  const betNone = useCallback(() => {
    setBet(0);
  }, [setBet]);
  const isValid = useMemo(() => {
    const hasNumbers = [balance, rolls, bet].reduce((valid, num) => {
      return valid && !isNaN(num);
    }, true);
    const underbet = bet <= balance;
    const hasBet = bet > 0;
    
    return hasNumbers && underbet && hasBet;
  }, [balance, rolls, bet]);
  const doRoll = useCallback(() => {
    gameContext.play(rolls);
  }, [gameContext.play, rolls]);
  const doError = useCallback(() => {
    console.error('Could not roll');
  }, []);
  const mappableRolls = range(gameContext.rolls);

  return <div className="play">
    <div className="control-row bet">
      <label>Bet</label>
      <input type="text" value={ isNaN(bet) ? '' : bet } onChange={ updateBet } />
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
      <button className="sub-half" onClick={ () => setBet(Math.round(bet / 2)) }>1 / 2</button>
      <button className="sub-third" onClick={ () => setBet(Math.round(bet / 3)) }>1 / 3</button>
      <div className="spacer"></div>
    </div>
    <div className="control-row rolls">
      <label>Rolls</label>
      <input type="text" value={ isNaN(rolls) ? '' : rolls } onChange={ updateRolls } />
      <button className="add-roll" onClick={ increaseRolls }>+</button>
      <button className="sub-roll" onClick={ decreaseRolls }>-</button>
      <button className="do-roll" onClick={ isValid ? doRoll : doError }>Roll</button>
      <div className="spacer"></div>
    </div>
    <hr className="divider" />
    <div className="games">
      { mappableRolls.map((roll) => (
        <RollProvider
          lockInValue={ (value) => gameContext.setValue(roll, value) }
          cycles={ 10 }
          key={ roll }>
          <GameRoll />
        </RollProvider>
      )) }
    </div>
  </div>;
}