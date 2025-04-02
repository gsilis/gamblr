import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { RepeatMatcher } from "~/objects/matcher/repeat-matcher";
import { type RollNumber } from "~/objects/roll-number";
import { Scorer } from "~/objects/scorer";
import { StorageContext } from "./storage-context";
import {
  REPEAT_ONE,
  REPEAT_TWO,
  REPEAT_THREE,
  REPEAT_FOUR,
  REPEAT_FIVE,
  REPEAT_SIX,
  STRAIGHT,
  type MatcherType
} from "~/constants/matcher";
import { StraightMatcher } from "~/objects/matcher/straight-matcher";
import { MATCHERS } from "~/constants/storage";
import type { Matcher } from "~/objects/matcher";
import { type Score as ScoreShape } from "~/objects/scorer";

const matcherMap: Record<MatcherType, Matcher> = {
  [REPEAT_ONE]: new RepeatMatcher(1),
  [REPEAT_TWO]: new RepeatMatcher(2),
  [REPEAT_THREE]: new RepeatMatcher(3),
  [REPEAT_FOUR]: new RepeatMatcher(4),
  [REPEAT_FIVE]: new RepeatMatcher(5),
  [REPEAT_SIX]: new RepeatMatcher(6),
  [STRAIGHT]: new StraightMatcher()
};

type Score = {
  scoreRoll: (bet: number, roll: RollNumber[]) => ScoreShape,
  addMatcher: (name: MatcherType) => void,
  removeMatcher: (name: MatcherType) => void,
};

const ScoreContext = createContext<Score>({
  scoreRoll: (bet: number, roll: RollNumber[]) => ({ wins: [], bet: 0, payout: 0 }),
  addMatcher: (name: MatcherType) => {},
  removeMatcher: (name: MatcherType) => {}
});

const ScoreProvider = ({
  children
}: {
  children: any
}) => {
  const storageContext = use(StorageContext);
  const [matchers, setMatchers] = useState<MatcherType[]>(storageContext.load(MATCHERS, [
    REPEAT_ONE,
    REPEAT_TWO,
    REPEAT_THREE,
    REPEAT_FOUR,
    REPEAT_FIVE,
    REPEAT_SIX,
    STRAIGHT,
  ]));
  const scorer = useMemo(() => {
    const scorer = new Scorer();

    return scorer;
  }, []);
  const scoreRoll = useCallback((bet: number, values: RollNumber[]) => {
    return {
      bet,
      payout: 0,
      wins: [],
    };
  }, [scorer]);
  const addMatcher = useCallback((name: MatcherType) => {
    setMatchers(ms => {
      if (ms.indexOf(name) > -1) {
        return ms;
      } else {
        return [...ms, name];
      }
    });
  }, [setMatchers]);
  const removeMatcher = useCallback((name: MatcherType) => {
    setMatchers(ms => ms.filter(m => m !== name));
  }, [setMatchers]);

  useEffect(() => {
    matchers && matchers.forEach(m => scorer.addMatcher(matcherMap[m]));
  }, [matchers, scorer]);

  const value = { scoreRoll, addMatcher, removeMatcher };

  return <ScoreContext value={ value }>{ children }</ScoreContext>;
};

export { ScoreContext, ScoreProvider };