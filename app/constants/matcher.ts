export const REPEAT_ONE = 'repeat_one';
export const REPEAT_TWO = 'repeat_two';
export const REPEAT_THREE = 'repeat_three';
export const REPEAT_FOUR = 'repeat_four';
export const REPEAT_FIVE = 'repeat_five';
export const REPEAT_SIX = 'repeat_six';
export const STRAIGHT = 'straight';

export type MatcherType = (
  typeof REPEAT_ONE |
  typeof REPEAT_TWO |
  typeof REPEAT_THREE |
  typeof REPEAT_FOUR | 
  typeof REPEAT_FIVE |
  typeof REPEAT_SIX |
  typeof STRAIGHT
);