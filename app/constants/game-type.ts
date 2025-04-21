/**
 * Names of available games
 */
export const TWO_DICE = 'two_dice' as const;
export const NULL = 'null' as const;

export type GameType = typeof NULL | typeof TWO_DICE;
export const Games: GameType[] = [TWO_DICE, NULL];