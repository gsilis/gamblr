import { expect, test, describe } from 'vitest';
import { Game } from './game';

describe('Game', () => {
  const rollNumbers = [1, 2, 3, 4, 5, 6];

  test('.running', () => {
    const game = new Game(3);

    expect(game.running).toBe(true);

    game.tick();
    expect(game.running).toBe(true);

    game.tick();
    game.tick();
    expect(game.running).toBe(false);
  });

  test('.finalValue', () => {
    const game = new Game(2);

    expect(game.finalValue).toBe(null);

    game.tick();
    game.tick();
    expect(game.finalValue).toBeOneOf(rollNumbers);
    const finalNumber = game.finalValue;
    game.tick();
    expect(game.finalValue).toBe(finalNumber);
  });

  test('.toJSON', () => {
    const game = new Game(2);

    expect(game.toJSON()).toEqual({ cycle: 0, cycles: 2, value: null });
    game.tick();
    expect(game.toJSON()).toEqual({ cycle: 1, cycles: 2, value: expect.toBeOneOf(rollNumbers) });
    game.tick();
    expect(game.toJSON()).toEqual({ cycle: 2, cycles: 2, value: expect.toBeOneOf(rollNumbers) });
  });

  test('.interimValue', () => {
    const game = new Game(2);
    const values = [1, 2, 3, 4, 5, 6];

    expect(game.finalValue).toBe(null);
    expect(game.interimValue).toBe(null);

    game.tick();
    expect(game.finalValue).toBe(null);
    expect(game.interimValue).toBeOneOf(values);

    game.tick();
    expect(game.finalValue).toBeOneOf(values);
    expect(game.finalValue).toEqual(game.interimValue);
  });
});