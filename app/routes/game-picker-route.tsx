import { use } from "react";
import { GameContext } from "~/contexts/game-context";

export default function GamePickerRoute() {
  const gameContext = use(GameContext);

  const selectedGame = gameContext.game;

  return <>Picker page</>;
}