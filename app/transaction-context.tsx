import { createContext, useCallback, useState } from "react";
import type { TransactionType } from "./types/transaction-type";
import { NULL_CATEGORY } from "./constants/transaction";
import TransactionFactory from "./factories/transaction-factory";

export type TransactionContextType = {
  transactions: TransactionType[],
  addTransaction: (transaction: TransactionType) => void,
  createBank: (amount: number, description: string) => TransactionType,
  createPawn: (amount: number, description: string) => TransactionType,
  createWin: (amount: number) => TransactionType,
  createBet: (amount: number, description: string) => TransactionType,
};

const blankTransaction: TransactionType = { amount: 0, description: '', category: NULL_CATEGORY, created: new Date() };

const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: (t: TransactionType) => {},
  createBank: (_1: number, _2: string) => blankTransaction,
  createPawn: (_1: number, _2: string) => blankTransaction,
  createWin: (_1: number) => blankTransaction,
  createBet: (_1: number, _2: string) => blankTransaction,
});

const TransactionProvider = ({ children }: { children: any }) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const factory = new TransactionFactory();
  const addTransaction = useCallback((transaction: TransactionType) => {
    setTransactions((t) => {
      return [...t, transaction];
    });
  }, [setTransactions]);
  const api = {
    transactions,
    addTransaction,
    createBank: factory.createBank,
    createPawn: factory.createPawn,
    createWin: factory.createWin,
    createBet: factory.createBet,
  };

  return <TransactionContext value={ api }>{ children }</TransactionContext>;
};

export { TransactionContext, TransactionProvider };