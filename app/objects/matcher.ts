import { type RollNumber } from "~/objects/roll-number";
import { type Win } from "./win";
import { type MatchType } from "./match-type";

export interface Matcher {
  match: (values: RollNumber[]) => Win[],
  type: MatchType,
};