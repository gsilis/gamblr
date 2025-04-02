import Dice from '~/components/dice/dice';
import Progress from '~/components/progress/progress';
import './roll.css';

export type RollProps = {
  progress: number,
  value: 1 | 2 | 3 | 4 | 5 | 6,
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