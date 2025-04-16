import { use } from "react";
import { useParams } from "react-router";
import { GamePicker } from "~/components/game-picker/game-picker";
import { GameContext } from "~/contexts/game-context";

export default function GamePickerRoute(args: any) {
  const params = useParams();
  const gameContext = use(GameContext);

  const selectedGame = gameContext.game;

  return <GamePicker game={ selectedGame }></GamePicker>;
}