import Dice from '~/components/dice/dice';
import Progress from '~/components/progress/progress';
import './roll.css';

export type RollProps = {
  progress: number,
  value: 1 | 2 | 3 | 4 | 5 | 6,
};

export default function Roll({
  progress,
  value,
}: RollProps) {
  return <div className="roll">
    <Progress progress={ progress } />
    <Dice display={ value } />
  </div>;
}