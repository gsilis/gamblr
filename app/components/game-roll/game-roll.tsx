import { use } from "react";
import { RollContext } from "~/roll-context";
import Roll from "../roll/roll";

export function GameRoll() {
  const {
    cycles,
    cycle,
    value,
  } = use(RollContext);
  const progress = Math.floor((cycle / cycles) * 100);

  return <Roll progress={ progress } value={ value as (1 | 2 | 3 | 4 | 5 | 6) } win={ false } />;
}