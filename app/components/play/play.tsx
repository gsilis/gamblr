import { useCallback } from "react";
import type { CityKey } from "~/constants/city";
import type { TransactionType } from "~/types/transaction-type";

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
  const addMoney = useCallback(() => {
    credit(100, 'Adding some money');
  }, [credit]);
  const removeMoney = useCallback(() => {
    debit(100, 'Removing some money');
  }, [debit]);

  return <>
    Play { city as string } - { balance }
    <button onClick={ addMoney }>+ 100</button>
    <button onClick={ removeMoney }>- 100</button>
  </>;
}