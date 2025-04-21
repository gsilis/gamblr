import { useEffect } from "react";
import type { GameComponent as GameComponentInterface } from "~/interfaces/game-component";

export const GameComponent = ({
  api: _api,
  program,
}: GameComponentInterface) => {
  useEffect(() => {
    console.warn('Null game component is not meant to be rendered.');
  }, []);

  return '';
};