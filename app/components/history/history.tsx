import { use, useMemo } from "react";
import type { CityKey } from "~/constants/city";
import { TransactionContext } from "~/contexts/transaction-context";
import Transaction from "../transaction/transaction";

type HistoryProps = {
  city: CityKey,
  balance: number,
};

export default function History({ city, balance }: HistoryProps) {
  const transactionContext = use(TransactionContext);
  const sortedTransactions = useMemo(() => {
    return transactionContext.transactions.sort((a, b) => {
      return a.created.valueOf() - b.created.valueOf();
    });
  }, [transactionContext.transactions]);

  return <>
    { sortedTransactions.map(
      (transaction, index) => (
        <Transaction transaction={ transaction } key={ index } />
      )) }
  </>;
}