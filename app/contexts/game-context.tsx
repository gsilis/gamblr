import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { type GameData } from "~/objects/game";
import { type RollNumber } from "~/objects/roll-number";
import { Roll, ROLL_COMPLETE, ROLL_START, ROLL_TICK } from "~/objects/roll";

type Game = {
  complete: boolean,
  displayValues: (RollNumber | null)[],
  finalValues: (RollNumber | null)[],
  maxCycles: number[],
  cycles: number[],
  roll: (count: number) => void,
  isRolling: boolean,
};

const GameContext = createContext<Game>({
  complete: false,
  displayValues: [],
  finalValues: [],
  maxCycles: [],
  cycles: [],
  roll: (_count: number) => {},
  isRolling: false,
});

const GameProvider = ({
  children,
}: {
  children: any
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [complete, setComplete] = useState(false);
  const [displayValues, setDisplayValues] = useState<(RollNumber | null)[]>([]);
  const [finalValues, setFinalValues] = useState<(RollNumber | null)[]>([]);
  const [maxCycles, setMaxCycles] = useState<number[]>([]);
  const [cycles, setCycles] = useState<number[]>([]);
  const rollData = useMemo(() => new Roll(), []);

  const doRoll = useCallback((count: number) => {
    rollData.reset();
    rollData.roll(count);
  }, [rollData]);

  const onStart = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];

    setComplete(false);
    setIsRolling(true);
    setFinalValues([]);
    setMaxCycles(gameData.map(g => g.cycles));
  }, [setComplete, setFinalValues, setMaxCycles, setIsRolling]);

  const onTick = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];

    setDisplayValues(gameData.map(g => g.value));
    setCycles(gameData.map(g => g.cycle));
  }, [setDisplayValues, setCycles]);

  const onComplete = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];
    const games = gameData.map(g => g.value);

    setIsRolling(false);
    setComplete(true);
    setFinalValues(games);
  }, [setComplete, setFinalValues, setIsRolling]);

  useEffect(() => {
    rollData.addEventListener(ROLL_COMPLETE, onComplete as EventListenerOrEventListenerObject);
    rollData.addEventListener(ROLL_START, onStart as EventListenerOrEventListenerObject);
    rollData.addEventListener(ROLL_TICK, onTick as EventListenerOrEventListenerObject);

    return () => {
      rollData.removeEventListener(ROLL_COMPLETE, onComplete as EventListenerOrEventListenerObject);
      rollData.removeEventListener(ROLL_START, onStart as EventListenerOrEventListenerObject);
      rollData.removeEventListener(ROLL_TICK, onTick as EventListenerOrEventListenerObject);
    };
  }, [rollData, onComplete, onStart, onTick]);

  const value = {
    complete,
    displayValues,
    finalValues,
    maxCycles,
    cycles,
    isRolling,
    roll: doRoll,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
};

export { GameContext, GameProvider };