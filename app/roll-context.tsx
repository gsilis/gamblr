import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { random } from './utilities/array';
import DiceRoll, { EVENT_COMPLETE, EVENT_PROGRESS, EVENT_VALUE } from './dice-roll';

export type RollContextType = {
  cycles: number,
  cycle: number,
  value: number | null,
};

const RollContext = createContext<RollContextType>({
  cycles: 0,
  cycle: 0,
  value: 1,
});

const RollProvider = ({
  children,
  lockInValue,
}: {
  children: any,
  lockInValue: (value: number) => void,
}) => {
  const [cycle, setCycle] = useState(0);
  const [value, setValue] = useState<null | number>(null);

  const cycles = useMemo(() => {
    return random([10, 20, 30, 40]);
  }, []);
  const roll = useMemo(() => {
    return new DiceRoll(cycles);
  }, [cycles]);

  const onProgress = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    const detail = customEvent.detail as { cycle: number };

    setCycle(detail.cycle);
  }, [setCycle]);
  const onValue = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    const detail = customEvent.detail as { value: 1 | 2 | 3 | 4 | 5 | 6 };

    setValue(detail.value);
  }, [setValue]);
  const onComplete = useCallback((_: Event) => {
    setValue((value) => {
      if (value !== null) {
        lockInValue(value);
      }

      return value;
    });
  }, [lockInValue, setValue]);

  useEffect(() => {
    roll.addEventListener(EVENT_PROGRESS, onProgress);
    roll.addEventListener(EVENT_VALUE, onValue);
    roll.addEventListener(EVENT_COMPLETE, onComplete);
    roll.start();
  }, []);

  const context = {
    cycles: cycles,
    cycle: cycle,
    value: value,
  };

  return <RollContext value={ context }>{ children }</RollContext>;
};

export { RollContext, RollProvider };