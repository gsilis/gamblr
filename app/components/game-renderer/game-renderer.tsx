import { use } from "react";
import { GameContext } from "~/contexts/game-context";

export default function GameRenderer() {
  const gameContext = use(GameContext);
  const GameComponent = gameContext.gameComponent;
  const gameApi = gameContext.gameApi;
  const gameProgram = gameContext.gameProgram;

  return <GameComponent api={ gameApi } program={ gameProgram }></GameComponent>;
}