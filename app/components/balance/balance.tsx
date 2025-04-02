import Register from "~/components/register/register";
import './balance.css';

export type BalanceProps = {
  balance: number,
};

export default function Balance({ balance }: BalanceProps) {
  const classNames = ['balance'];

  if (balance > 0) {
    classNames.push('positive');
  } else if (balance < 0) {
    classNames.push('negative');
  }

  return <div className={ classNames.join(' ') }>
    <p className="label">Balance</p>
    <div className="marker">
      <span className="positive">+</span>
      <span className="negative">-</span>
    </div>
    <Register value={ balance } size={ 15 } />
  </div>;
}