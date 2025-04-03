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
      { balance > 0 && <span className="positive" title="positive funds">+</span> }
      { balance < 0 && <span className="negative" title="negative funds">-</span> }
    </div>
    <Register value={ balance } size={ 15 } />
  </div>;
}