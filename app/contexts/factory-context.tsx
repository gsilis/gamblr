import { createContext, use, useMemo } from "react";
import { AccountFactory } from "~/factories/account-factory";
import { GameFactory } from "~/factories/game-factory";
import { StorageFactory } from "~/factories/storage-factory";
import { StorageContext } from "./storage-context";
import { GameApiContext } from "./game-api-context";

/**
 * Provides all of the factories we need to
 * any component that needs them.
 * 
 * Trying this out with them centralized.
 */
interface FactoryContextShape {
  storageFactory: StorageFactory,
  accountFactory: AccountFactory,
  gameFactory: GameFactory,
};

export const FactoryContext = createContext<FactoryContextShape>({
  storageFactory: StorageFactory.default(),
  accountFactory: AccountFactory.default(),
  gameFactory: GameFactory.default(),
});

export function FactoryProvider({ children }: { children: any }) {
  const storageContext = use(StorageContext);
  const gameApiContext = use(GameApiContext);

  const storageFactory = useMemo<StorageFactory>(() => {
    return new StorageFactory(storageContext.storage);
  }, [storageContext.storage]);
  const accountFactory = useMemo<AccountFactory>(() => {
    return new AccountFactory(storageContext.storage, storageFactory);
  }, [storageContext.storage]);
  const gameFactory = useMemo<GameFactory>(() => {
    return new GameFactory(gameApiContext.gameApi);
  }, [gameApiContext.gameApi]);

  const api = {
    storageFactory,
    accountFactory,
    gameFactory,
  };

  return <FactoryContext value={ api }>{ children }</FactoryContext>;
}

export default { FactoryContext, FactoryProvider };