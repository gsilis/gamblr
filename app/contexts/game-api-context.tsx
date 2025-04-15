import { createContext, use, useMemo } from "react";
import { GameApi } from "~/game-support/game-api";
import { StorageContext } from "./storage-context";

interface GameApiShape {
  gameApi: GameApi
}

export const GameApiContext = createContext<GameApiShape>({
  gameApi: GameApi.defaultValue
});

export function GameApiProvider({ children }: { children: any }) {
  const storageContext = use(StorageContext);
  const gameApi = useMemo<GameApi>(() => {
    return new GameApi(storageContext.storage);
  }, [storageContext.storage]);

  const api = { gameApi };

  return <GameApiContext value={ api }>{ children }</GameApiContext>;
}

export default { GameApiContext, GameApiProvider };