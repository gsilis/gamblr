import Counter from "../counter/counter";
import type { CounterDisplayType } from "../counter/counter";
import './register.css';

export type RegisterProps = {
  value: number,
  size: number,
};

export default function Register({ value, size }: RegisterProps) {
  const amounts = `${value}`.split('').map(s => parseInt(s)) as CounterDisplayType[];

  while (amounts.length < size) {
    amounts.unshift(null);
  }

  return <div className="register">
    { amounts.map((a, i) => <Counter key={ i } display={ a } />) }
  </div>;
}