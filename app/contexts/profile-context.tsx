import { createContext, use, useCallback, useState } from 'react';
import type { CityKey } from '~/constants/city';
import { StorageContext } from '~/contexts/storage-context';
import { CITY, BALANCE, FLED_CITIES } from '~/constants/storage';

export type ProfileContextType = {
  city: CityKey | null,
  setCity: (value: CityKey) => void,
  balance: number,
  debit: (value: number) => void,
  credit: (value: number) => void,
  fledCities: CityKey[],
};

const ProfileContext = createContext<ProfileContextType>({
  city: null,
  setCity: (v: CityKey) => {},
  balance: 0,
  debit: (v: number) => {},
  credit: (v: number) => {},
  fledCities: [],
});
const ProfileProvider = ({ children }: { children: any }) => {
  const storageContext = use(StorageContext);
  const savedCity = storageContext.load(CITY, null);
  const savedBalance = storageContext.load(BALANCE, 0);
  const fledCities = storageContext.load(FLED_CITIES, []);

  if (!storageContext) {
    throw new Error('Needs to be wrapped with a storage context');
  }

  const [city, setCity] = useState<CityKey | null>(savedCity);
  const [balance, setBalance] = useState<number>(parseInt(savedBalance));
  const debit = useCallback((value: number) => {
    setBalance((b) => {
      const newValue = b - value;
      storageContext.save(BALANCE, newValue);
      return newValue;
    }
  );
  }, [setBalance, storageContext]);
  const credit = useCallback((value: number) => {
    setBalance((b) => {
      const newValue = b + value;
      storageContext.save(BALANCE, newValue);
      return newValue;
    }
  );
  }, [setBalance, storageContext]);
  const setSaveCity = useCallback((value: CityKey) => {
    if (city) {
      storageContext.save(FLED_CITIES, [...fledCities, city]);
    }

    storageContext.save(CITY, value);
    setCity(value);
  }, [setCity, city, fledCities]);

  const value: ProfileContextType = {
    city,
    setCity: setSaveCity,
    balance,
    debit,
    credit,
    fledCities,
  };

  return <ProfileContext value={ value }>{ children }</ProfileContext>;
};

export { ProfileContext, ProfileProvider };