import LogoSvg from '../../../assets/logo.svg';
import City from './city';
import './logo.css';
import Phrases from './phrases';

export default function Logo() {
  return <div className="logo">
    <img alt="Gamblr" src={ LogoSvg } />
    <City />
    <Phrases />
  </div>;
}