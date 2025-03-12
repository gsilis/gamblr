import type { CityKey } from "~/constants/city";

type HistoryProps = {
  city: CityKey,
  balance: number,
};

export default function History(historyProps: HistoryProps) {
  const {
    city,
    balance,
  } = historyProps;

  return <>
    History { city as string } - { balance }
  </>;
}