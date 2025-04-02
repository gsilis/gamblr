import { createContext, use, useCallback, useMemo, useState } from "react";
import { type TransactionType } from "~/types/transaction-type";
import { NULL_CATEGORY } from "~/constants/transaction";
import TransactionFactory from "~/factories/transaction-factory";
import { StorageContext } from "./storage-context";
import { TRANSACTIONS } from "~/constants/storage";

export type TransactionContextType = {
  transactions: TransactionType[],
  addTransaction: (transaction: TransactionType) => void,
  createBank: (amount: number, description: string) => TransactionType,
  createPawn: (amount: number, description: string) => TransactionType,
  createWin: (amount: number) => TransactionType,
  createBet: (amount: number, description: string) => TransactionType,
};

const blankTransaction: TransactionType = {
  amount: 0,
  description: '',
  category: NULL_CATEGORY,
  created: new Date(),
};

const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: (t: TransactionType) => {},
  createBank: (_1: number, _2: string) => blankTransaction,
  createPawn: (_1: number, _2: string) => blankTransaction,
  createWin: (_1: number) => blankTransaction,
  createBet: (_1: number, _2: string) => blankTransaction,
});

const TransactionProvider = ({ children }: { children: any }) => {
  const storageContext = use(StorageContext);
  const existingTransactions = useMemo(() => {
    return storageContext.load(TRANSACTIONS, []);
  }, []);

  const [transactions, setTransactions] = useState<TransactionType[]>(existingTransactions);
  const factory = new TransactionFactory();
  const addTransaction = useCallback((transaction: TransactionType) => {
    setTransactions((t) => {
      const combined = [...t, transaction];

      storageContext.save(TRANSACTIONS, combined);
      return combined;
    });
  }, [setTransactions, storageContext]);
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