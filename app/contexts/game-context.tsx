import { createContext, use, useMemo, useState } from "react";
import type { GameComponent } from "~/interfaces/game-component";
import { type GameProgram } from "~/interfaces/game-program";
import { GameComponent as NullGameComponent } from "~/games/null/game-component";
import { GameProgram as NullGameProgram } from "~/games/null/game-program";
import { NULL, type GameType } from "~/constants/game-type";
import { StorageContext } from "./storage-context";
import { componentFor } from "~/constants/game-config";
import { FactoryContext } from "./factory-context";

/**
 * Keeps track of the current running game program for
 * integration into React.
 */
interface GameContextShape {
  game: GameType,
  gameProgram: GameProgram,
  gameComponent: React.ComponentType<GameComponent>,
  setGame(name: GameType): void,
};

export const GameContext = createContext<GameContextShape>({
  game: NULL,
  gameProgram: new NullGameProgram(),
  gameComponent: NullGameComponent,
  setGame(_name: GameType) {}
});

export function GameProvider({
  children,
}: {
  children: any
}) {
  const factoryContext = use(FactoryContext);

  const [game, setGame] = useState<GameType>(NULL);

  const gameProgram = useMemo<GameProgram>(() => {
    return factoryContext.gameFactory.createFor(game);
  }, [game, factoryContext.gameFactory]);

  const gameComponent = useMemo<React.ComponentType<GameComponent>>(() => {
    return componentFor(game);
  }, [game]);

  const api = {
    game,
    gameProgram,
    gameComponent,
    setGame,
  };

  return <GameContext value={ api }>{ children }</GameContext>;
}

export default { GameContext, GameProvider };