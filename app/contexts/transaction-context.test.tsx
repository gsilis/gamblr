import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TransactionContext, TransactionProvider } from "./transaction-context";
import { use } from "react";
import { StorageContext, type StorageContextType } from "./storage-context";
import type { TransactionType } from "~/types/transaction-type";

type MockFunction = ReturnType<typeof vi.fn>;

const transactionId = 'transaction';
const transactionSizeId = 'transaction-length';
const amountId = 'amount';
const descriptionId = 'description';
const categoryId = 'category';
const createdId = 'created';
const addTransactionId = 'create-transaction';

const TestingComponent = ({ addTransactionProps }: { addTransactionProps?: TransactionType }) => {
  const transactionContext = use(TransactionContext);

  return <>
    <span data-testid={ transactionSizeId }>{ transactionContext.transactions.length }</span>
    { transactionContext.transactions.map((transaction, index) => {
      return <div data-testid={ transactionId } key={ index }>
        <span data-testid={ amountId }>{ transaction.amount }</span>
        <span data-testid={ descriptionId }>{ transaction.description }</span>
        <span data-testid={ categoryId }>{ transaction.category }</span>
        <span data-testid={ createdId }>{ transaction.created.toString() }</span>
      </div>;
    }) }
    <button
      data-testid={ addTransactionId }
      onClick={ () => addTransactionProps && transactionContext.addTransaction(addTransactionProps) }
    >
      Add transaction
    </button>
  </>;
};

describe('TransactionContext', () => {
  let storageApi: StorageContextType;
  let save: MockFunction;
  let load: MockFunction;

  beforeEach(() => {
    save = vi.fn();
    load = vi.fn();

    storageApi = {
      save,
      load,
    };
  });

  afterEach(() => {
    cleanup();
  });

  describe('.transactions', () => {
    test('shows transactions', () => {
      const amount = 200;
      const description = 'A testing transaction';
      const category = 'null_category';
      const created = new Date();
      (load as MockFunction).mockReturnValueOnce([{ amount, description, category, created }]);

      render(
        <StorageContext value={ storageApi }>
          <TransactionProvider>
            <TestingComponent />
          </TransactionProvider>
        </StorageContext>
      );

      expect(screen.getByTestId(transactionSizeId)?.textContent).toEqual('1');
      expect(screen.getByTestId(amountId)?.textContent).toEqual(`${amount}`);
      expect(screen.getByTestId(descriptionId)?.textContent).toEqual(description);
      expect(screen.getByTestId(categoryId)?.textContent).toEqual(category);
      expect(screen.getByTestId(createdId)?.textContent).toEqual(created.toString());
    });
  });

  describe('.addTransaction', () => {
    test('pushes the transaction onto the collection and saves it', async () => {
      const amount = 100;
      const description = 'testing description';
      const category = 'win';
      const created = new Date();
      (load as MockFunction).mockReturnValueOnce([]);

      render(
        <StorageContext value={ storageApi }>
          <TransactionProvider>
            <TestingComponent addTransactionProps={ { amount, description, created, category } } />
          </TransactionProvider>
        </StorageContext>
      );

      expect(screen.getByTestId(transactionSizeId)?.textContent).toEqual('0');
      await screen.getByTestId(addTransactionId).click();
      expect(storageApi.save).toHaveBeenCalledWith('transaction_storage', [{ amount, description, category, created }]);
      expect(screen.getByTestId(transactionSizeId)?.textContent).toEqual('1');
    });
  });
});