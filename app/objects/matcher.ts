import { type RollNumber } from "./game";
import { type Win } from "./win";
import { type MatchType } from "./match-type";

export interface Matcher {
  match: (values: RollNumber[]) => Win[],
  type: MatchType,
};