import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { NULL } from "~/constants/game-type";
import { GameContext } from "~/contexts/game-context";

export default function PickerRoute() {
  const gameContext = use(GameContext);
  const navigate = useNavigate();

  const game = gameContext.game;
  const hasGame = game !== NULL;

  const goto = hasGame ? `/play/${game}` : '/play/picker';

  if (goto) {
    useEffect(() => {
      navigate(goto);
    }, [goto, navigate]);
  }
}