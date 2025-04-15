import { NavLink } from 'react-router';
import './navigation.css';
import { use } from 'react';
import { CityContext } from '~/contexts/city-context';

type NavigationMeta = {};

export function Navigation({}: NavigationMeta) {
  const cityContext = use(CityContext);
  const city = cityContext.city;

  if (city) {
    return <nav className="app-navigation">
      <NavLink to="/play">🎲 Play</NavLink>
      <NavLink to="/bank">Bank</NavLink>
      <NavLink to="/pawn-shop">Pawn Shop</NavLink>
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