import { use } from "react";
import { Navigate } from "react-router";
import { CityContext } from '~/contexts/city-context';
import { GameContext } from "~/contexts/game-context";

export default function PlayRoute() {
  const cityContext = use(CityContext);
  const gameContext = use(GameContext);

  if (cityContext?.city) {
    return 'Play';
  } else {
    return <Navigate to="/city-picker" />;
  }
}
