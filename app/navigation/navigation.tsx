import { NavLink } from 'react-router';
import './navigation.css';
import { use } from 'react';
import { ProfileContext } from '~/profile-context';

type NavigationMeta = {};

export function Navigation({}: NavigationMeta) {
  const profile = use(ProfileContext);
  const city = profile.city;

  if (city) {
    return <nav className="app-navigation">
      <NavLink to="/play">🎲 Play</NavLink>
      <NavLink to="/pawn-shop">Pawn Shop</NavLink>
      <NavLink to="/history">History</NavLink>
      <hr />
      <NavLink className="reset" to="/reset">Reset</NavLink>
      <div className="divider"></div>
      <NavLink className="nuclear-option" to="/nuclear-option">😱 Nuclear Option</NavLink>
    </nav>;
  } else {
    return <nav className="app-navigation">
      <NavLink to="/city-picker">Setup</NavLink>
    </nav>;
  }
}