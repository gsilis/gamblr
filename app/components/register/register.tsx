import Counter, { type CounterDisplayType } from "~/components/counter/counter";
import './register.css';

export type RegisterProps = {
  value: number,
  size: number,
};

export default function Register({ value, size }: RegisterProps) {
  const amounts = `${Math.abs(value)}`.split('').map(s => parseInt(s)) as CounterDisplayType[];

  while (amounts.length < size) {
    amounts.unshift(null);
  }

  return <div className="register">
    { amounts.map((a, i) => <Counter key={ i } display={ a } />) }
  </div>;
}