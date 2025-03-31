import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { type GameData, type RollNumber } from "~/objects/game";
import { Roll, ROLL_COMPLETE, ROLL_START, ROLL_TICK } from "~/objects/roll";

type Game = {
  complete: boolean,
  displayValues: (RollNumber | null)[],
  finalValues: (RollNumber | null)[],
  maxCycles: number[],
  cycles: number[],
  roll: typeof Roll.prototype.roll,
};

const GameContext = createContext<Game>({
  complete: false,
  displayValues: [],
  finalValues: [],
  maxCycles: [],
  cycles: [],
  roll: (_count: number) => {}
});

const GameProvider = ({
  children,
}: {
  children: any
}) => {
  const [complete, setComplete] = useState(false);
  const [displayValues, setDisplayValues] = useState<(RollNumber | null)[]>([]);
  const [finalValues, setFinalValues] = useState<(RollNumber | null)[]>([]);
  const [maxCycles, setMaxCycles] = useState<number[]>([]);
  const [cycles, setCycles] = useState<number[]>([]);

  const rollData = useMemo(() => {
    const roll = new Roll();

    return roll;
  }, []);
  const onComplete = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];
    const games = gameData.map(g => g.value);

    setComplete(true);
    setFinalValues(games);
  }, [setComplete, setFinalValues]);
  const onStart = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];

    setComplete(false);
    setFinalValues([]);
    setMaxCycles(gameData.map(g => g.cycles));
  }, [setComplete, setFinalValues, setMaxCycles]);
  const onTick = useCallback((event: CustomEvent) => {
    const gameData = event.detail.games as GameData[];

    setDisplayValues(gameData.map(g => g.value));
    setCycles(gameData.map(g => g.cycle));
  }, [setDisplayValues, setCycles]);
  const doRoll = useCallback((count: number) => {
    rollData.reset();
    rollData.roll(count);
  }, [rollData]);

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
    roll: doRoll,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
};

export { GameContext, GameProvider };