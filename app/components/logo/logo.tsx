import type { CityKey } from '~/constants/city';
import LogoSvg from '../../../assets/logo.svg';
import City from './city';
import './logo.css';
import Phrases from './phrases';

type LogoPropTypes = {
  city: CityKey | null,
};

export default function Logo({ city }: LogoPropTypes) {
  return <div className="logo">
    <img alt="Gamblr" src={ LogoSvg } />
    <City city={ city } />
    <Phrases />
  </div>;
}