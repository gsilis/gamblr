import { GameRoll } from "~/components/game-roll/game-roll";
import { GameProgram } from "../game-program";
import "./roll.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EVENT_COMPLETE, EVENT_PROGRESS, EVENT_VALUE } from "~/game-support/dice-roll";

interface RollProps {
  game: GameProgram
};

export default function Roll({ game }: RollProps) {
  return <div className="roll">
    <GameRoll cycles={ 10 } cycle={ 5 } value={ 5 } />
    <GameRoll cycles={ 10 } cycle={ 4 } value={ 2 } />
  </div>;
}