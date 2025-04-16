import { type GameComponent as GameComponentInterface } from "~/interfaces/game-component";

export const GameComponent = ({ balance, program, deposit, withdraw } :GameComponentInterface) => {
  return <>
    <p>TWO DICE</p>
    <p>{ balance }</p>
    <button onClick={ () => deposit(100) }>Deposit 100</button>
    <button onClick={ () => withdraw(100) }>Withdraw 100</button>
  </>;
};