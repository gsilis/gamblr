import { describe, expect, it } from "vitest";
import { between } from "./number";

describe('number', () => {
  describe('between', () => {
    it('picks a number between the min and max provided', () => {
      const min = 3;
      const max = 10;
      const testValue = between(min, max);

      expect(testValue).toBeGreaterThanOrEqual(min);
      expect(testValue).toBeLessThanOrEqual(max);
    });
  });
});