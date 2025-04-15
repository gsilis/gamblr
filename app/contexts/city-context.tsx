import { createContext, use, useCallback, useMemo, useState } from "react";
import Cities, { type City } from "~/constants/city";
import { FactoryContext } from "./factory-context";
import type { KeyedStorage } from "~/game-support/keyed-storage";

interface CityContextShape {
  city: City | null,
  travel(city: City): void,
}

export const CityContext = createContext<CityContextShape>({
  city: null,
  travel(_city: City) {}
});

export function CityProvider({ children }: { children: any }) {
  const factoryContext = use(FactoryContext);
  const storageFactory = factoryContext.storageFactory;
  
  const cityStore = useMemo<KeyedStorage<City | null>>(() => {
    return storageFactory.createStringKeyedStorage<City | null>(
      'gambling-city',
      (city => `${city}`),
      (savedCity: string): City | null => {
        return Cities[Cities.indexOf(savedCity as City)] || null;
      }
    );
  }, [storageFactory]);

  const [city, setCity] = useState<City | null>(cityStore.retrieve(null));

  const travel = useCallback((city: City) => {
    setCity(city);
    cityStore.save(city);
  }, [setCity, cityStore.save]);

  const api: CityContextShape = {
    city,
    travel,
  };

  return <CityContext value={ api }>{ children }</CityContext>;
}

export default { CityContext, CityProvider };