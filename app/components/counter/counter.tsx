import Image0 from '../../../assets/0.svg';
import Image1 from '../../../assets/1.svg';
import Image2 from '../../../assets/2.svg';
import Image3 from '../../../assets/3.svg';
import Image4 from '../../../assets/4.svg';
import Image5 from '../../../assets/5.svg';
import Image6 from '../../../assets/6.svg';
import Image7 from '../../../assets/7.svg';
import Image8 from '../../../assets/8.svg';
import Image9 from '../../../assets/9.svg';
import './counter.css';

export type CounterDisplayType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

type CounterProps = {
  display: CounterDisplayType,
};

const images = [
  Image0,
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
];

export default function Counter({ display }: CounterProps) {
  return <div className="counter">
    { display !== null && <img src={ images[display] } alt={ `${display}` } /> }
  </div>;
}