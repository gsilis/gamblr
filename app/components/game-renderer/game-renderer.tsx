import { use } from "react";
import { AccountContext } from "~/contexts/account-context";
import { FactoryContext } from "~/contexts/factory-context";
import { GameContext } from "~/contexts/game-context";

export default function GameRenderer() {
  const gameContext = use(GameContext);
  const accountContext = use(AccountContext);
  const factoryContext = use(FactoryContext);

  const GameComponent = gameContext.gameComponent;
  const gameProgram = gameContext.gameProgram;

  const deposit = accountContext.deposit;
  const withdraw = accountContext.withdraw;

  const storageFactory = factoryContext.storageFactory;

  return (
    <GameComponent
      program={ gameProgram }
      balance={ accountContext.balance }
      deposit={ deposit }
      withdraw={ withdraw }
      storageFactory={ storageFactory }
    >
    </GameComponent>
  );
}