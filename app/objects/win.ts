import { type DicePosition } from "./dice-position";
import type { MatchType } from "./match-type";

export type Win = {
  type: MatchType,
  dice: DicePosition[],
  multiplier: number
};