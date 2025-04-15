import { use } from "react";
import { Navigate } from "react-router";
import GameRenderer from "~/components/game-renderer/game-renderer";
import { CityContext } from '~/contexts/city-context';
import { GameContext } from "~/contexts/game-context";

export default function PlayRoute() {
  const cityContext = use(CityContext);

  if (cityContext?.city) {
    return <GameRenderer></GameRenderer>;
  } else {
    return <Navigate to="/city-picker" />;
  }
}
