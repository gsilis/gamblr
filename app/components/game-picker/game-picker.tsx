import type { GameType } from "~/constants/game-type";
import { GameConfig, playableGames } from "~/constants/game-config";
import { use, useCallback } from "react";
import { GameContext } from "~/contexts/game-context";
import { useNavigate } from "react-router";
import { ScreenPrompt } from "../screen-prompt/screen-prompt";

interface GamePickerProps { game: GameType }

export function GamePicker({ game: selectedGame }: GamePickerProps) {
  const gameContext = use(GameContext);
  const navigate = useNavigate();

  const selectGame = useCallback((game: GameType) => {
    gameContext.setGame(game);
    navigate('/play');
  }, [gameContext.setGame]);

  return <ScreenPrompt
    title={ 'Select Game' }
    confirmText={ 'Play!' }
  >
    { playableGames.map((game, index) => {
      const gameConfig = GameConfig[game];
      const classes = ['tile'];

      if (selectedGame === game) {
        classes.push('selected');
      }

      return (
        <div className={ classes.join(' ') }>
          <h2>{ gameConfig.title }</h2>
          <p>{ gameConfig.description }</p>
        </div>
      );
    }) }
  </ScreenPrompt>;
}