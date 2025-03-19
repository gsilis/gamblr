import { createContext, useCallback, useMemo, useState } from "react";

export type GameContextType = {
  clear: () => void,
  rolls: number,
  values: number[],
  isComplete: boolean,
  isRolling: boolean,
  setValue: (index: number, value: number) => void,
  play: (rolls: number) => void,
};

const GameContext = createContext<GameContextType>({
  clear: () => {},
  rolls: 0,
  values: [],
  isComplete: false,
  isRolling: false,
  setValue: (index: number, value: number) => {},
  play: (_: number) => {},
});

const GameProvider = ({
  children,
}: {
  children: any,
}) => {
  const [rolls, setRolls] = useState(0);
  const [values, setValues] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const clear = useCallback(() => {
    // Clear is called when you're about to roll, so we set rolling to true
    setValues([]);
    setRolls(0);
    setIsRolling(true);
    setIsComplete(false);
  }, [setValues, setRolls, setIsComplete, setIsRolling]);
  const setValue = useCallback((roll: number, value: number) => {
    setValues((vs) => {
      vs[roll] = value;

      if (vs.join('').length === rolls) {
        setIsComplete(true);
        setIsRolling(false);
      }

      return vs;
    });
  }, [setValues, setIsRolling, setIsComplete, rolls]);

  const context = {
    clear,
    rolls,
    values,
    setValue,
    isComplete,
    isRolling,
    play: setRolls,
  };

  return <GameContext value={ context }>{ children }</GameContext>;
};

export { GameContext, GameProvider };