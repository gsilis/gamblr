type BalanceProps = {
  balance: number
}

export default function Balance({ balance }: BalanceProps) {
  return <dl>
    <dt>Balance</dt>
    <dd>{ balance }</dd>
  </dl>;
}