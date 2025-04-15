import { NavLink } from 'react-router';
import './navigation.css';
import { use } from 'react';
import { CityContext } from '~/contexts/city-context';
import { GameContext } from '~/contexts/game-context';
import { GameConfig } from '~/constants/game-config';
import { NULL } from '~/constants/game-type';

type NavigationMeta = {};

export function Navigation({}: NavigationMeta) {
  const gameContext = use(GameContext);
  const cityContext = use(CityContext);

  const city = cityContext.city;
  const game = gameContext.game;
  const hasGame = game !== NULL;
  const gameTitle = GameConfig[game]?.title;

  if (city) {
    return <nav className="app-navigation">
      { hasGame && <NavLink to={ `/play/${game}` }>🎲 Play { gameTitle }</NavLink> }
      { !hasGame && <NavLink to="/play/picker">Pick Game</NavLink> }
      <NavLink to="/bank">Bank</NavLink>
      <NavLink to="/pawn-shop">Pawn Shop</NavLink>
      <hr />
      { hasGame && <NavLink to="/play/picker">Change Game</NavLink> }
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