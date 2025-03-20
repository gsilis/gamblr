import { use } from "react";
import type { CityKey } from "~/constants/city";
import { TransactionContext } from "~/transaction-context";

type HistoryProps = {
  city: CityKey,
  balance: number,
};

export default function History({ city, balance }: HistoryProps) {
  const transactionContext = use(TransactionContext);

  return <>
    History { city as string } - { balance }
    { transactionContext.transactions.join(', ') }
  </>;
}