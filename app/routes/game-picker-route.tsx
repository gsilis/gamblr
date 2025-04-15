import { use } from "react";
import { GamePicker } from "~/components/game-picker/game-picker";
import { GameContext } from "~/contexts/game-context";

export default function GamePickerRoute() {
  const gameContext = use(GameContext);

  const selectedGame = gameContext.game;

  return <GamePicker game={ selectedGame }></GamePicker>;
}