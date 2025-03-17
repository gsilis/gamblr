import { createContext, useCallback, useMemo, useState } from "react";

export type GameContextType = {
  rolls: number,
  values: number[],
  isComplete: boolean,
  setValue: (index: number, value: number) => void,
  play: (rolls: number) => void,
};

const GameContext = createContext<GameContextType>({
  rolls: 0,
  values: [],
  isComplete: false,
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
  const setValue = useCallback((roll: number, value: number) => {
    setValues((vs) => {
      vs[roll - 1] = value;
      return vs;
    });
  }, [setValues]);
  const isComplete = useMemo(() => {
    return values.reduce((p, v) => p && v > 0, true);
  }, [values]);

  const context = {
    rolls,
    values,
    setValue,
    isComplete,
    play: setRolls,
  };

  return <GameContext value={ context }>{ children }</GameContext>;
};

export { GameContext, GameProvider };