export const ONES = 'repeat_ones';
export const TWOS = 'repeat_twos';
export const THREES = 'repeat_threes';
export const FOURS = 'repeat_fours';
export const FIVES = 'repeat_fives';
export const SIXES = 'repeat_sixes';
export const STRAIGHT = 'straight';

export type MatchType = (
  typeof ONES |
  typeof TWOS |
  typeof THREES |
  typeof FOURS |
  typeof FIVES |
  typeof SIXES |
  typeof STRAIGHT
);