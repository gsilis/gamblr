import { use, useMemo } from "react";
import type { CityKey } from "~/constants/city";
import { TransactionContext } from "~/contexts/transaction-context";
import Transaction from "../transaction/transaction";
import ListHeading from "../list-heading/list-heading";
import "./history.css";

type HistoryProps = {
  city: CityKey,
  balance: number,
};

export default function History({ city, balance }: HistoryProps) {
  const transactionContext = use(TransactionContext);
  const sortedTransactions = useMemo(() => {
    return transactionContext.transactions.sort((a, b) => {
      const a1 = Date.parse(a.created as string);
      const b1 = Date.parse(b.created as string);

      return a1.valueOf() - b1.valueOf();
    });
  }, [transactionContext.transactions]);

  return <section className="history">
    <ListHeading>
      <span data-space="3">Description</span>
      <span data-space="1">Category</span>
      <span data-space="1">Date</span>
      <span data-space="2">Amount</span>
    </ListHeading>
    { sortedTransactions.map(
      (transaction, index) => (
        <Transaction transaction={ transaction } key={ index } />
      )) }
  </section>;
}