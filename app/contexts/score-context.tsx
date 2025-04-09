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
import type { Win } from "~/objects/win";

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
  scoreRoll: (roll: RollNumber[], bet: number) => ScoreShape,
  addMatcher: (name: MatcherType) => void,
  removeMatcher: (name: MatcherType) => void,
};

const ScoreContext = createContext<Score>({
  scoreRoll: (roll: RollNumber[], bet: number) => ({ wins: [], bet: 0, payout: 0 }),
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
  const scoreRoll = useCallback((values: RollNumber[], bet: number, ) => {
    const score: {
      bet: number,
      payout: number,
      wins: Win[],
    } = {
      bet,
      payout: 0,
      wins: [],
    };

    matchers.map(mt => matcherMap[mt]).forEach((matcher) => {
      score.wins.push(...matcher.match(values));
    });

    if (score.wins.length > 0) {
      score.payout = Math.round(bet * score.wins.reduce((multi, win) => {
        return multi + win.multiplier;
      }, 1));
    }

    return score;
  }, [scorer, matchers]);
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

  const value = { scoreRoll, addMatcher, removeMatcher, scoreRoll };

  return <ScoreContext value={ value }>{ children }</ScoreContext>;
};

export { ScoreContext, ScoreProvider };