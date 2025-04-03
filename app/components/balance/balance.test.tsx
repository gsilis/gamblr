import { afterEach, describe, expect, test } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import Balance from "./balance";

describe('<Balance />', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows neutral balance', () => {
    render(<Balance balance={ 0 } />);

    expect(screen.queryByTitle('positive funds')?.textContent).not.toBeDefined();
    expect(screen.queryByTitle('negative funds')?.textContent).not.toBeDefined();
  });

  test('shows negative numbers', () => {
    render(<Balance balance={ -100 } />);

    expect(screen.queryByTitle('positive funds')?.textContent).not.toBeDefined();
    expect(screen.queryByTitle('negative funds')?.textContent).toEqual('-');
  });

  test('shows positive numbers', () => {
    render(<Balance balance={ 100 } />);

    expect(screen.queryByTitle('positive funds')?.textContent).toEqual('+');
    expect(screen.queryByTitle('negative funds')?.textContent).not.toBeDefined();
  });
});