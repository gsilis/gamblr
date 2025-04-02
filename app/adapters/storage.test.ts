import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Storage from "~/adapters/storage";

const getInstance = () => {
  return new Storage();
};

describe('Storage', () => {
  let getItem: ReturnType<typeof vi.fn>;
  let setItem: ReturnType<typeof vi.fn>;
  let localStorageMock: { getItem: () => any, setItem: () => any };

  beforeEach(() => {
    getItem = vi.fn();
    setItem = vi.fn();
    localStorageMock = (() => {
      return {
        getItem,
        setItem,
      };
    })();

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('save', () => {
    test('it saves passed data', () => {
      const subject = getInstance();

      subject.save('key-name', { test: 100 });
      expect(setItem).toHaveBeenCalledWith('key-name', "{\"test\":100}");
    });

    test('it saves simple values', () => {
      const subject = getInstance();

      subject.save('simple-value', 20);
      expect(setItem).toHaveBeenCalledWith('simple-value', '20');
    });
  });

  describe('load', () => {
    test('it retrieves keys', () => {
      getItem.mockReturnValue("\"testing\"");

      const subject = getInstance();
      expect(subject.retrieve('key-testing', 'fallback')).toEqual('testing');
      expect(getItem).toHaveBeenCalledWith('key-testing');
    });

    test('it sends back the fallback if no key is present', () => {
      getItem.mockReturnValue(null);

      const subject = getInstance();
      expect(subject.retrieve('bad-key', 'fallback-here')).toEqual('fallback-here');
      expect(getItem).toHaveBeenCalledWith('bad-key');
    });

    test('it returns a number if it got a number', () => {
      getItem.mockReturnValue(JSON.stringify(2000));

      const subject = getInstance();
      expect(subject.retrieve('some-key', 'not-this-value')).toEqual(2000);
      expect(getItem).toHaveBeenCalledWith('some-key');
    });
  });
});