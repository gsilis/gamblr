import type { CityKey } from '~/constants/city';
import LogoSvg from '../../../assets/logo.svg';
import City from './city';
import './logo.css';
import Phrases from './phrases';
import { use } from 'react';
import { ProfileContext } from '~/profile-context';

type LogoPropTypes = {
  city: CityKey | null,
};

export default function Logo() {
  const profile = use(ProfileContext);
  
  if (!profile) {
    throw new Error('Could not load context');
  }

  const city = profile.city ? profile.city : null;

  return <div className="logo">
    <img alt="Gamblr" src={ LogoSvg } />
    <City city={ city } />
    <Phrases />
  </div>;
}