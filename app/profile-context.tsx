import { createContext, use, useCallback, useState } from 'react';
import type { CityKey } from './constants/city';
import { StorageContext } from './storage-context';
import { CITY, BALANCE, TRANSACTIONS } from './constants/storage';

export type ProfileContextType = {
  city: CityKey | null,
  setCity: (value: CityKey) => void,
  balance: number,
  debit: (value: number) => void,
  credit: (value: number) => void,
};

const ProfileContext = createContext<ProfileContextType>({
  city: null,
  setCity: (v: CityKey) => {},
  balance: 0,
  debit: (v: number) => {},
  credit: (v: number) => {},
});
const ProfileProvider = ({ children }: { children: any }) => {
  const storageContext = use(StorageContext);

  if (!storageContext) {
    throw new Error('Needs to be wrapped with a storage context');
  }

  const [city, setCity] = useState<CityKey | null>(storageContext.load(CITY, null));
  const [balance, setBalance] = useState<number>(storageContext.load(BALANCE, 0));
  const debit = useCallback((value: number) => {
    setBalance((balance) => {
      const newValue = balance - value;
      storageContext.save(BALANCE, newValue);
      return newValue;
    }
  );
  }, [setBalance, storageContext]);
  const credit = useCallback((value: number) => {
    setBalance((balance) => {
      const newValue = balance + value;
      storageContext.save(BALANCE, newValue);
      return newValue;
    }
  );
  }, [setBalance, storageContext]);
  const setSaveCity = useCallback((value: CityKey) => {
    storageContext.save(CITY, value);
    setCity(value);
  }, [setCity]);

  const value: ProfileContextType = {
    city,
    setCity: setSaveCity,
    balance,
    debit,
    credit
  };

  return <ProfileContext value={ value }>{ children }</ProfileContext>;
};

export { ProfileContext, ProfileProvider };