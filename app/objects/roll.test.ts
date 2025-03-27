import { vi, describe, it, expect, test } from "vitest";
import { Roll, ROLL_COMPLETE, ROLL_START, ROLL_TICK, CYCLES } from "./roll";

const MAX_CYCLES = CYCLES.reduce((c, i) => Math.max(c, i), 0);

describe('Roll', () => {
  test('.addEventListener', () => {
    const instance = new Roll();
    
    expect(() => {
      instance.addEventListener('any', vi.fn());
    }).not.toThrow();
  });

  test('.removeEventListener', () => {
    const instance = new Roll();
    const callback = vi.fn();

    expect(() => {
      instance.addEventListener('any', callback);
      instance.removeEventListener('any', callback);
    });
  });

  describe('.hasGames', () => {
    it('changes when rolled', () => {
      const instance = new Roll();

      vi.useFakeTimers({ toFake: ['setTimeout'] });
      
      expect(instance.hasGames).toBe(false);
      instance.roll(2);
      expect(instance.hasGames).toBe(true);

      vi.clearAllTimers();
      vi.useRealTimers();
    });
  });

  describe('.complete', () => {
    it('flips when rolled, and back when rolls are exhausted', () => {
      const instance = new Roll();

      /* Loop until we've hit max rolls + 1 */
      vi.useFakeTimers();
      expect(instance.complete).toBe(false);
      instance.roll(3);
      vi.advanceTimersByTime(MAX_CYCLES * 50);
      expect(instance.complete).toBe(true);
      vi.clearAllTimers();
      vi.useRealTimers();
    });
  });

  describe('.roll', () => {
    it('triggers a start event', () => {
      const instance = new Roll();
      const callback = vi.fn();

      vi.useFakeTimers();
      instance.addEventListener(ROLL_START, callback);
      instance.roll(2);
      expect(callback).toHaveBeenCalledTimes(1);
      vi.clearAllTimers();
      vi.useRealTimers();

      instance.removeEventListener(ROLL_START, callback);
    });

    it('triggers tick events', () => {
      const instance = new Roll();
      const callback = vi.fn();

      vi.useFakeTimers();
      instance.addEventListener(ROLL_TICK, callback);
      instance.roll(2);
      vi.advanceTimersByTime(100);
      expect(callback).toBeCalledTimes(3);
      vi.clearAllMocks();
      vi.useRealTimers();

      instance.removeEventListener(ROLL_TICK,  callback);
    });

    it('triggers a complete event', () => {
      const instance = new Roll();
      const callback = vi.fn();

      vi.useFakeTimers();
      instance.addEventListener(ROLL_COMPLETE, callback);
      instance.roll(2);
      vi.advanceTimersByTime(MAX_CYCLES * 50);
      expect(callback).toBeCalledTimes(1);
      vi.clearAllMocks();
      vi.useRealTimers();

      instance.removeEventListener(ROLL_COMPLETE,  callback);
    });
  });

  describe('.values', () => {
    it('returns values of games', () => {
      const instance = new Roll();

      vi.useFakeTimers();
      instance.roll(3);
      expect(instance.values).toEqual([
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6])
      ]);
      vi.advanceTimersByTime(MAX_CYCLES * 50);
      expect(instance.values).toEqual([
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6])
      ]);
      vi.clearAllTimers();
      vi.useRealTimers();
    });
  });

  describe('.finalValues', () => {
    it('returns null and then final values', () => {
      const instance = new Roll();
      
      vi.useFakeTimers();
      instance.roll(3);
      expect(instance.finalValues).toEqual([null, null, null]);
      vi.advanceTimersByTime(MAX_CYCLES * 50);
      expect(instance.finalValues).toEqual([
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6]),
        expect.toBeOneOf([1, 2, 3, 4, 5, 6])
      ]);
      vi.clearAllTimers();
      vi.useRealTimers();
    });
  });
});