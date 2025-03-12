import { createContext, useCallback, useState } from 'react';
import type { CityKey } from './constants/city';
import type { TransactionType } from './types/transaction-type';

export type ProfileContextType = {
  city: CityKey | null,
  setCity: (value: CityKey) => void,
  balance: number,
  setBalance: (value: number) => void,
  debit: (value: number) => void,
  credit: (value: number) => void,
  transactions: TransactionType[],
  addTransaction: (transactionType: TransactionType) => void,
};

const ProfileContext = createContext<ProfileContextType>({
  city: null,
  setCity: (v: CityKey) => {},
  balance: 0,
  setBalance: (v: number) => {},
  debit: (v: number) => {},
  credit: (v: number) => {},
  transactions: [],
  addTransaction: (transactionType: TransactionType) => {},
});
const ProfileProvider = ({ children }: { children: any }) => {
  const [city, setCity] = useState<CityKey | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const debit = useCallback((value: number) => {
    setBalance(balance => balance - value);
  }, [setBalance]);
  const credit = useCallback((value: number) => {
    setBalance(balance => balance + value);
  }, [setBalance]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const addTransaction = useCallback((transaction: TransactionType) => {
    setTransactions((t) => {
      return [...t, transaction];
    });
  }, [setTransactions]);

  const value: ProfileContextType = {
    city,
    setCity,
    balance,
    setBalance,
    debit,
    credit,
    transactions,
    addTransaction
  };

  return <ProfileContext value={ value }>{ children }</ProfileContext>;
};

export { ProfileContext, ProfileProvider };