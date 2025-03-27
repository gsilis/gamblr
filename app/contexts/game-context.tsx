import { createContext, useCallback, useEffect, useState } from "react";
import { blank, random } from "~/utilities/array";

export type GameContextType = {
  rollCount: number,
  isRolling: boolean,
  isComplete: boolean,
  games: Game[],
  roll: (count: number) => void,
};

type Game = {
  value: number | null,
  max: number,
  cycle: number,
};

const GameContext = createContext<GameContextType>({
  rollCount: 0,
  isRolling: false,
  isComplete: false,
  games: [],
  roll: (_: number) => {},
});

const GameProvider = ({
  children,
}: {
  children: any
}) => {
  const [count, setCount] = useState(0);
  const [isRolling, setRolling] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  const roll = useCallback((count: number) => {
    if (isRolling) {
      return;
    }

    const a = setGames(blank(count).map(game => {
      return {
        value: null,
        max: random([10, 20, 30, 40]),
        cycle: 0,
      };
    }));

    setCount(count);
    setComplete(false);
    setRolling(true);
  }, [setCount, isRolling, setRolling, setComplete]);

  const tick = useCallback((games: Game[]) => {
    let remaining = false;

    setGames(games => {
      console.log('Within setGames', games);
      games.forEach(game => {
        if (game.cycle < game.max) {
          remaining = true;
          game.cycle += 1;
          game.value = random([1, 2, 3, 4, 5, 6], game.value);
        }
      });

      return games;
    });

    if (remaining) {
      setTimeout(tick, 50);
    } else {
      setRolling(false);
      setComplete(true);
    }
  }, [setGames, setRolling, setComplete]);

  useEffect(() => {
    tick(games);
  }, [games]);

  const value = {
    rollCount: count,
    isRolling,
    isComplete,
    games,
    roll
  };

  return <GameContext value={ value }>{ children }</GameContext>
};

export { GameContext, GameProvider };