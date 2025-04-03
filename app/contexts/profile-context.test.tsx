import { use } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ProfileContext, ProfileProvider } from "./profile-context";
import { StorageContext, StorageProvider, type StorageContextType } from "./storage-context";
import type { CityKey } from "~/constants/city";

type MockFunction = ReturnType<typeof vi.fn>;

/**
 * Ideally there would be a withArguments(x, y, z).mockReturnValue(<val>)
 * Rather than relying on call order, but to speed this up, the mock
 * will rely on call order.
 */
describe('ProfileProvider', () => {
  let storageContext: StorageContextType;
  const cityId = 'city';
  const balanceId = 'balance';
  const creditId = 'credit-100';
  const debitId = 'debit-100';
  const changeCityId = 'change-city';
  let otherCity = 'other-city';

  beforeEach(() => {
    storageContext = {
      save: vi.fn(),
      load: vi.fn(),
    };
  });

  afterEach(() => {
    cleanup();
  });

  const TestingComponent = ({}) => {
    const profile = use(ProfileContext);

    return <>
      <p data-testid={ cityId }>{ profile.city as string }</p>
      <p data-testid={ balanceId }>{ profile.balance }</p>
      <button data-testid={ creditId } onClick={ () => profile.credit(100) }>Credit</button>
      <button data-testid={ debitId } onClick={ () => profile.debit(100) }>Debit</button>
      <button data-testid={ changeCityId } onClick={ () => profile.setCity(otherCity as CityKey) }>Change City</button>
    </>;
  };

  describe('city', () => {
    test('has access', () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('Thing')
        .mockReturnValueOnce(0);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      expect(screen.getByTestId(cityId).textContent).toEqual('Thing');
    });
  });

  describe('balance', () => {
    test('has access', () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('')
        .mockReturnValueOnce(1000);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      expect(screen.getByTestId(balanceId).textContent).toEqual('1000');
    });
  });

  describe('credit', () => {
    test('adjusts balance', async () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('')
        .mockReturnValueOnce(1000);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      await screen.getByTestId(creditId).click();
      expect(screen.getByTestId(balanceId).textContent).toEqual('1100');
    });

    test('saves new balance in storage', async () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('')
        .mockReturnValueOnce(1000);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      await screen.getByTestId(creditId).click();
      expect(storageContext.save).toHaveBeenCalledWith('balance_storage', 1100);
    });
  });

  describe('debit', () => {
    test('adjusts balance', async () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('')
        .mockReturnValueOnce(1000);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      await screen.getByTestId(debitId).click();
      expect(screen.getByTestId(balanceId).textContent).toEqual('900');
    });

    test('saves new balance in storage', async () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('')
        .mockReturnValueOnce(1000);

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      await screen.getByTestId(debitId).click();
      expect(storageContext.save).toHaveBeenCalledWith('balance_storage', 900);
    });
  });

  describe('setCity', () => {
    test('updates the city', async () => {
      (storageContext.load as MockFunction)
        .mockReturnValueOnce('Springfield')
        .mockReturnValueOnce(0);
      otherCity = 'Branson';

      render(
        <StorageContext value={ storageContext }>
          <ProfileProvider>
            <TestingComponent />
          </ProfileProvider>
        </StorageContext>
      );

      expect(screen.getByTestId(cityId).textContent).toEqual('Springfield');
      await screen.getByTestId(changeCityId).click();
      expect(screen.getByTestId(cityId).textContent).toEqual('Branson');
    });
  });
});