import { NavLink } from 'react-router';
import './navigation.css';

type NavigationMeta = {};

export function Navigation({}: NavigationMeta) {
  return <nav className="app-navigation">
    <NavLink to="/">Play</NavLink>
    <NavLink to="/history">History</NavLink>
    <hr />
    <NavLink className="reset" to="/reset">Reset</NavLink>
    <div className="divider"></div>
    <NavLink className="nuclear-option" to="/nuclear-option">Nuclear Option 😱</NavLink>
  </nav>;
}