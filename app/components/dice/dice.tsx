import './dice.css';

export type DiceProps = {
  display: 1 | 2 | 3 | 4 | 5 | 6,
};

export default function Dice({
  display,
}: DiceProps) {
  const classNames = ['dice', `roll-${display}`];

  return <div className={ classNames.join(' ') }>
    <div className="dot column-1 row-1"></div>
    <div className="dot column-1 row-2"></div>
    <div className="dot column-1 row-3"></div>
    <div className="dot column-3 row-1"></div>
    <div className="dot column-3 row-2"></div>
    <div className="dot column-3 row-3"></div>
    <div className="dot column-2 row-2"></div>
  </div>;
}