import { createContext, use, useCallback, useMemo, useState } from "react";
import Cities, { type City } from "~/constants/city";
import { FactoryContext } from "./factory-context";
import type { KeyedStorage } from "~/game-support/keyed-storage";
import { deduplicated } from "~/utilities/array";
import { GAMBLING_CITY, VISITED_CITIES } from "~/constants/storage";

interface CityContextShape {
  city: City | null,
  travel(city: City): void,
  visitedCities: City[],
}

export const CityContext = createContext<CityContextShape>({
  city: null,
  travel(_city: City) {},
  visitedCities: [],
});

export function CityProvider({ children }: { children: any }) {
  const factoryContext = use(FactoryContext);
  const storageFactory = factoryContext.storageFactory;
  
  const cityStore = useMemo<KeyedStorage<City | null>>(() => {
    return storageFactory.createStringKeyedStorage<City | null>(
      GAMBLING_CITY,
      (city => `${city}`),
      (savedCity: string): City | null => {
        return Cities[Cities.indexOf(savedCity as City)] || null;
      }
    );
  }, [storageFactory]);

  const visitedCityStore = useMemo(() => {
    return storageFactory.createStringKeyedStorage<City[]>(
      VISITED_CITIES,
      ((cities) => cities.filter(Boolean).join('|')),
      ((cities: string): City[] => {
        const parsed = cities.split('|');

        return (parsed as City[]) || [];
      })
    );
  }, [storageFactory]);

  const [city, setCity] = useState<City | null>(cityStore.retrieve(null));
  const [visitedCities, setVisitedCities] = useState<City[]>(visitedCityStore.retrieve([]));

  const tickCity = useCallback((city: City) => {
    const visitedCities = visitedCityStore.retrieve([]);
    const newVisitedCities = deduplicated<City>([ ...visitedCities, city ]);

    visitedCityStore.save(newVisitedCities);
    setVisitedCities(newVisitedCities);
  }, [visitedCityStore.save, setVisitedCities, visitedCities]);

  const travel = useCallback((city: City) => {
    setCity(city);
    cityStore.save(city);
    tickCity(city);
  }, [setCity, cityStore.save, tickCity]);

  const api: CityContextShape = {
    city,
    travel,
    visitedCities,
  };

  return <CityContext value={ api }>{ children }</CityContext>;
}

export default { CityContext, CityProvider };