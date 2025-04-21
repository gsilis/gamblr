import type { GameType } from "~/constants/game-type";
import { GameConfig, playableGames } from "~/constants/game-config";
import { use, useCallback, useState } from "react";
import { GameContext } from "~/contexts/game-context";
import { useNavigate } from "react-router";
import { ScreenPrompt } from "../screen-prompt/screen-prompt";
import "./game-picker.css";

interface GamePickerProps { game: GameType }

export function GamePicker({ game: initiallySelectedGame }: GamePickerProps) {
  const gameContext = use(GameContext);
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState<GameType>(initiallySelectedGame);

  const playGame = useCallback((game: GameType) => {
    gameContext.setGame(game);
    navigate(`/play/${game}`);
  }, [gameContext.setGame, selectedGame]);

  const onPlay = useCallback(() => {
    playGame(selectedGame);
  }, [selectedGame, playGame]);

  return <ScreenPrompt
    title={ 'Select Game' }
    confirmText={ 'Play!' }
    onConfirm={ onPlay }
    className="game-picker"
  >
    { playableGames.map((game, index) => {
      const gameConfig = GameConfig[game];
      const classes = ['tile'];

      if (selectedGame === game) {
        classes.push('selected');
      }

      return (
        <div key={ index } className={ classes.join(' ') } onClick={ () => setSelectedGame(game) }>
          <h2>{ gameConfig.title }</h2>
          <p>{ gameConfig.description }</p>
        </div>
      );
    }) }
  </ScreenPrompt>;
}