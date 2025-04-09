import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { type GameData } from "~/objects/game";
import { type RollNumber } from "~/objects/roll-number";
import { Roll, ROLL_COMPLETE, ROLL_START, ROLL_TICK } from "~/objects/roll";
import { PlayContext } from "./play-context";
import { ScoreContext } from "./score-context";
import type { Score } from "~/objects/scorer";
import { ProfileContext } from "./profile-context";
import { TransactionContext } from "./transaction-context";

type Game = {
  complete: boolean,
  displayValues: (RollNumber | null)[],
  finalValues: (RollNumber | null)[],
  maxCycles: number[],
  cycles: number[],
  roll: (count: number, bet: number) => void,
  isRolling: boolean,
  score: Score | null,
};

const GameContext = createContext<Game>({
  complete: false,
  displayValues: [],
  finalValues: [],
  maxCycles: [],
  cycles: [],
  roll: (_count: number, _bet: number) => {},
  isRolling: false,
  score: null,
});

const GameProvider = ({
  children,
}: {
  children: any
}) => {
  const scoreContext = use(ScoreContext);
  const profileContext = use(ProfileContext);
  const transactionContext = use(TransactionContext);
  const [bet, setBet] = useState(0);
  const [score, setScore] = useState<Score | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [complete, setComplete] = useState(false);
  const [displayValues, setDisplayValues] = useState<(RollNumber | null)[]>([]);
  const [finalValues, setFinalValues] = useState<(RollNumber | null)[]>([]);
  const [maxCycles, setMaxCycles] = useState<number[]>([]);
  const [cycles, setCycles] = useState<number[]>([]);
  const rollData = useMemo(() => new Roll(), []);

  const doRoll = useCallback((count: number, bet: number) => {
    rollData.reset();
    setBet(bet);
    rollData.roll(count);
  }, [rollData, setBet]);

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
    const games = gameData.map(g => g.value) as RollNumber[];

    setIsRolling(false);
    setComplete(true);
    setFinalValues(games);

    const score = scoreContext.scoreRoll(games, bet);
    setScore(score);

    if (score.payout > 0) {
      profileContext.credit(score.payout);
      transactionContext.addTransaction(transactionContext.createWin(score.payout));
    }
  }, [
    setComplete,
    setFinalValues,
    setIsRolling,
    scoreContext.scoreRoll,
    bet,
    setScore,
    profileContext.credit,
    transactionContext.addTransaction,
    transactionContext.createWin
  ]);

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
    score,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
};

export { GameContext, GameProvider };