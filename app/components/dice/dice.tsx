import './dice.css';

export type DiceProps = {
  display: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  win: boolean,
};

export default function Dice({
  display,
  win = false
}: DiceProps) {
  const classNames = ['dice', `roll-${display}`];

  if (win) {
    classNames.push('winner');
  }

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