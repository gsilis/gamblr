import { useCallback, useState } from "react";

type BetProps = {
  doBet: (amount: number) => {},
  balance: number,
};

export default function Bet({ doBet, balance }: BetProps) {
  const [amount, setAmount] = useState(balance);

  return <>
    <input type="number" onChange={ e => setAmount(parseInt(e.target.value)) } />
    <button onClick={ () => doBet(amount) }>Bet!</button>
  </>;
}