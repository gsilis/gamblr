import { NavLink } from 'react-router';
import './navigation.css';

type NavigationMeta = {};

export function Navigation({}: NavigationMeta) {
  return <nav className="app-navigation">
    <NavLink to="/">Play</NavLink>
    <NavLink to="/history">History</NavLink>
  </nav>;
}