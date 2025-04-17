import { type GameComponent as GameComponentInterface } from "~/interfaces/game-component";
import Roll from "~/components/roll/roll";
import type { GameProgram } from "./game-program";
import { useCallback, useEffect, useMemo, useState } from "react";
import BetControl from "./components/bet-control";
import "./game-component.css";
import { EVENT_COMPLETE, EVENT_PROGRESS, EVENT_VALUE, type DICE_VALUE } from "~/game-support/dice-roll";
import BetMagnitude from "./components/bet-magnitude";
import { BILLIONS, HUNDREDS, MILLIONS, QUADRILLIONS, THOUSANDS, TRILLIONS } from "~/constants/magnitude";

export const GameComponent = ({
  program,
  deposit,
  withdraw,
  storageFactory,
} :GameComponentInterface) => {
  const game = program as GameProgram;

  const magnitudeStorage = useMemo(() => {
    return storageFactory.createNumericKeyedStorage('two-dice-magnitude');
  }, [storageFactory]);

  const [values, setValues] = useState<DICE_VALUE[]>(game.roll.values(2));
  const [progress, setProgress] = useState(game.roll.progress(2));
  const [rolling, setRolling] = useState<boolean>(false);
  const [pair, setPair] = useState(0);
  const [sum7, setSum7] = useState(0);
  const [sumSub7, setSumSub7] = useState(0);
  const [sumPlus7, setSumPlus7] = useState(0);
  const [sequence, setSequence] = useState(0);
  const [bet1, setBet1] = useState(0);
  const [bet2, setBet2] = useState(0);
  const [bet3, setBet3] = useState(0);
  const [bet4, setBet4] = useState(0);
  const [bet5, setBet5] = useState(0);
  const [bet6, setBet6] = useState(0);
  const [streak, setStreak] = useState<number>(game.streak);
  const [rolls, setRolls] = useState<number>(game.rollCount);
  const [lastWin, setLastWin] = useState<number>(game.lastWin);
  const [lastBet, setLastBet] = useState<number>(game.lastBet);
  const [magnitude, setMagnitude] = useState(magnitudeStorage.retrieve(HUNDREDS));

  const onValue = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    const values: DICE_VALUE[] = customEvent.detail?.values || [1, 1];

    setValues(values);
  }, [setValues]);

  const onProgress = useCallback(() => {
    const customEvent = event as CustomEvent;
    const progress: number[] = customEvent.detail?.percentages || [0, 0];

    setProgress(progress);
  }, [setProgress]);

  const onUpdateMagnitude = useCallback((value: number) => {
    magnitudeStorage.save(value);
    setMagnitude(value);
  }, [magnitudeStorage.save, setMagnitude]);

  const suffix = useMemo(() => {
    switch (magnitude) {
      case HUNDREDS:
        return '';

      case THOUSANDS:
        return 'K';

      case MILLIONS:
        return 'M';
      
      case BILLIONS:
        return 'B';

      case TRILLIONS:
        return 'T';

      case QUADRILLIONS:
        return 'Q';

      default:
        return '';
    }
  }, [magnitude]);

  const onComplete = useCallback(() => {
    setRolling(false);
    deposit(game.score({
      pair,
      sequence,
      sum7,
      sumSub7,
      sumPlus7,
      one: bet1,
      two: bet2,
      three: bet3,
      four: bet4,
      five: bet5,
      six: bet6,
    }));
    setRolls(game.rollCount);
    setStreak(game.streak);
    setLastBet(game.lastBet);
    setLastWin(game.lastWin);
  }, [
    setRolling,
    setRolls,
    setStreak,
    setLastBet,
    setLastWin,
    game,
    deposit,
    pair,
    sequence,
    sum7,
    sumSub7,
    sumPlus7,
    bet1,
    bet2,
    bet3,
    bet4,
    bet5,
    bet6,
  ]);

  const onReset = useCallback(() => {
    setPair(0);
    setSequence(0);
    setSum7(0);
    setSumSub7(0);
    setSumPlus7(0);
    setBet1(0);
    setBet2(0);
    setBet3(0);
    setBet4(0);
    setBet5(0);
    setBet6(0);
  }, [
    setPair,
    setSequence,
    setSum7,
    setSumSub7,
    setSumPlus7,
    setBet1,
    setBet2,
    setBet3,
    setBet4,
    setBet5,
    setBet6
  ]);

  const total = [
    pair,
    sum7,
    sumSub7,
    sumPlus7,
    sequence,
    bet1,
    bet2,
    bet3,
    bet4,
    bet5,
    bet6
  ].reduce((a, s) => a + s, 0);

  const onPlay = useCallback(() => {
    if (total < 1) {
      return;
    }

    setRolling(true);
    withdraw(total);
    game.play(total);
  }, [
    pair,
    sum7,
    sumSub7,
    sumPlus7,
    sequence,
    bet1,
    bet2,
    bet3,
    bet4,
    bet5,
    bet6,
    total,
    setRolling,
    game.roll,
    withdraw,
  ]);

  useEffect(() => {
    game.roll.addEventListener(EVENT_VALUE, onValue);
    game.roll.addEventListener(EVENT_COMPLETE, onComplete);
    game.roll.addEventListener(EVENT_PROGRESS, onProgress);

    return () => {
      game.roll.removeEventListener(EVENT_VALUE, onValue);
      game.roll.removeEventListener(EVENT_COMPLETE, onComplete);
      game.roll.removeEventListener(EVENT_PROGRESS, onProgress);
    };
  }, [
    game.roll,
    onValue,
    onProgress,
    onComplete,
  ]);

  return <>
    <div className="dice-roll">
      { values.map((value: DICE_VALUE, index: number) => {
        return <Roll progress={ progress[index] } value={ value } key={ index } />
      }) }
    </div>
    <button className="play" onClick={ () => onPlay() } disabled={ rolling }>Roll</button>
    <hr className="divider" />
    <div className="bet">
      <BetMagnitude
        magnitude={ magnitude }
        updateMagnitude={ onUpdateMagnitude }
      />
      <BetControl title={ 'Pair' } value={ pair } setValue={ setPair } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ 'Sum 7' } value={ sum7 } setValue={ setSum7 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ 'Sum < 7' } value={ sumSub7 } setValue={ setSumSub7 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ 'Sum > 7' } value={ sumPlus7 } setValue={ setSumPlus7 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ 'Sequence' } value={ sequence } setValue={ setSequence } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '1' } value={ bet1 } setValue={ setBet1 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '2' } value={ bet2 } setValue={ setBet2 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '3' } value={ bet3 } setValue={ setBet3 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '4' } value={ bet4 } setValue={ setBet4 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '5' } value={ bet5 } setValue={ setBet5 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
      <BetControl title={ '6' } value={ bet6 } setValue={ setBet6 } disabled={ rolling } suffix={ suffix } magnitude={ magnitude } />
    </div>
    <hr className="divider" />
    <div className="totals">
      <input type="text" value={ total } readOnly />
      <button onClick={ () => onReset() } disabled={ rolling }>CLEAR</button>
    </div>
    <hr className="divider" />
    <div className="datapoint">
      <label>Streak</label>
      <span>{ streak }</span>
    </div>
    <div className="datapoint">
      <label>Rolls</label>
      <span>{ rolls }</span>
    </div>
    <div className="datapoint">
      <label>Bet</label>
      <span>{ lastBet }</span>
    </div>
    <div className="datapoint">
      <label>Winnings</label>
      <span>{ lastWin }</span>
    </div>
  </>;
};