import { createContext, useEffect, useState } from 'react';
import { random } from './utilities/array';

export type RollContextType = {
  cycles: number,
  cycle: number,
  value: number,
};

const RollContext = createContext<RollContextType>({
  cycles: 0,
  cycle: 0,
  value: 1,
});

const RollProvider = ({
  children,
  cycles = 0,
  lockInValue,
}: {
  children: any,
  cycles: number,
  lockInValue: (value: number) => void,
}) => {
  const [value, setValue] = useState(1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // This should only be called when there is a change to the
    // cycles or value setter.
    if (cycle >= cycles) {
      // We're done with the run
      lockInValue(value);
      return;
    }

    setTimeout(() => {
      setCycle(c => c + 1);
      setValue(v => random([1, 2, 3, 4, 5, 6], v));
    }, 1000);
  }, [cycles, cycle, setCycle, value, setValue, lockInValue]);

  const context = {
    cycles: cycles,
    cycle: cycle,
    value: value,
  };

  return <RollContext value={ context }>{ children }</RollContext>;
};

export { RollContext, RollProvider };