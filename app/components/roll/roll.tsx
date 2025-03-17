import Dice from '../dice/dice';
import Progress from '../progress/progress';
import './roll.css';

export type RollProps = {
  progress: number,
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  win?: boolean,
};

export default function Roll({
  progress,
  value,
  win = false,
}: RollProps) {
  return <div className="roll">
    <Progress progress={ progress } />
    <Dice win={ win } display={ value } />
  </div>;
}