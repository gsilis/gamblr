import { use } from "react";
import { Navigate } from "react-router";
import { GamePicker } from "~/components/game-picker/game-picker";
import { CityContext } from "~/contexts/city-context";
import { GameContext } from "~/contexts/game-context";

export default function GamePickerRoute(args: any) {
  const cityContext = use(CityContext);
  const gameContext = use(GameContext);

  const selectedGame = gameContext.game;

  if (cityContext.city) {
    return <GamePicker game={ selectedGame }></GamePicker>;
  } else {
    return <Navigate to="/city-picker" />;
  }
}