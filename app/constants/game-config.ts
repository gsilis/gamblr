import type React from "react";
import { NULL, TWO_DICE, type GameType } from "./game-type";
import type { GameProgram } from "~/interfaces/game-program";
import type { GameComponent } from "~/interfaces/game-component";
import { GameComponent as NullGameComponent } from "~/games/null/game-component";
import { GameProgram as NullGameProgram } from "~/games/null/game-program";
import { GameComponent as TwoDiceGameComponent } from "~/games/two-dice/game-component";
import { GameProgram as TwoDiceGameProgram } from "~/games/two-dice/game-program";

/**
 * Mapping game names with the components and game programs
 */
export const GameConfig: {
  [Property in GameType]: {
    name: GameType,
    ui: React.ComponentType<GameComponent>,
    data: { new(): GameProgram },
    title: string,
    description: string,
  }
} = {
  [TWO_DICE]: {
    name: TWO_DICE,
    ui: TwoDiceGameComponent,
    data: TwoDiceGameProgram,
    title: 'Two Dice',
    description: 'This is just two dice. You bet on roll sequences, or doubles, or upper/lower sums.',
  },
  [NULL]: {
    name: NULL,
    ui: NullGameComponent,
    data: NullGameProgram,
    title: 'Not a Game',
    description: 'This is not a game.',
  }
};

export const playableGames = [TWO_DICE];

export function componentFor(name: GameType): React.ComponentType<GameComponent> {
  const setting = GameConfig[name];

  return setting.ui;
}