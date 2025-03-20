import Roll from "../roll/roll";

type GameRollProps = {
  cycle: number,
  cycles: number,
  value: number,
};

export function GameRoll({
  cycle,
  cycles,
  value,
}: GameRollProps) {
  const progress = Math.floor((cycle / cycles) * 100);

  return <Roll progress={ progress } value={ value as (1 | 2 | 3 | 4 | 5 | 6) } win={ false } />;
}