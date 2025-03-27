import { random } from "~/utilities/array";
import { Game } from "./game";

export const ROLL_COMPLETE = 'roll_complete';
export const ROLL_START = 'roll_start';
export const ROLL_TICK = 'roll_tick';

export class Roll {
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private games: Game[] = [];
  private dispatcher: EventTarget;

  constructor() {
    this.dispatcher = new EventTarget();
  }

  addEventListener(
    eventName: string,
    fn: () => void
  ): ReturnType<typeof EventTarget.prototype.addEventListener> {
    return this.dispatcher.addEventListener(eventName, fn);
  }

  removeEventListener(
    eventName: string,
    fn: () => void
  ): ReturnType<typeof EventTarget.prototype.removeEventListener> {
    return this.dispatcher.removeEventListener(eventName, fn);
  }

  reset() {
    this.games = [];
  }

  get hasGames(): boolean {
    return this.games.length > 0;
  }

  get complete(): boolean {
    return this.games.length > 0 && this.games.reduce((complete: boolean, game: Game): boolean => {
      return complete && game.finalValue !== null;
    }, true);
  }

  roll(count: number) {
    if (this.hasGames && !this.complete) {
      return;
    }

    for (let i = 0; i < count; i++) {
      this.games.push(new Game(random([10, 20, 30, 40])));
    }

    this.tick();
  }

  tick = () => {
    this.games.map((game: Game) => {
      game.tick()
      this.dispatcher.dispatchEvent(new CustomEvent(ROLL_TICK, { detail: game.toJSON() }));
    });

    if (this.complete) {
      this.dispatcher.dispatchEvent(new CustomEvent(ROLL_COMPLETE));
    } else {
      this.timeout = globalThis.setTimeout(this.tick, 50);
    }
  }
}