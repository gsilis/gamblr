import { random } from "~/utilities/array";
import { Game, type RollNumber } from "./game";

export const ROLL_COMPLETE = 'roll_complete';
export const ROLL_START = 'roll_start';
export const ROLL_TICK = 'roll_tick';
export const CYCLES = [10, 15, 20, 25, 30, 35, 40, 45, 50];

export class Roll {
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private games: Game[] = [];
  private dispatcher: EventTarget;

  constructor() {
    this.dispatcher = new EventTarget();
  }

  addEventListener(
    eventName: string,
    fn: EventListenerOrEventListenerObject
  ): ReturnType<typeof EventTarget.prototype.addEventListener> {
    return this.dispatcher.addEventListener(eventName, fn);
  }

  removeEventListener(
    eventName: string,
    fn: EventListenerOrEventListenerObject
  ): ReturnType<typeof EventTarget.prototype.removeEventListener> {
    return this.dispatcher.removeEventListener(eventName, fn);
  }

  reset() {
    this.games = [];
  }

  get values(): (RollNumber | null)[] {
    return this.games.map(g => g.interimValue);
  }

  get finalValues(): (RollNumber | null)[] {
    return this.games.map(g => g.finalValue);
  }

  get hasGames(): boolean {
    return this.games.length > 0;
  }

  get complete(): boolean {
    return this.games.length > 0 && this.games.reduce((complete: boolean, game: Game): boolean => {
      return complete && game.finalValue !== null;
    }, true);
  }

  roll = (count: number) => {
    if (this.hasGames && !this.complete) {
      return;
    }

    for (let i = 0; i < count; i++) {
      this.games.push(new Game(random(CYCLES)));
    }

    this.dispatcher.dispatchEvent(new CustomEvent(ROLL_START, {
      detail: {
        games: this.games.map((game: Game) => {
          game.tick()
          return game.toJSON();
        }),
        roll: this,
      },
    }));
    this.tick();
  }

  tick = () => {
    this.dispatcher.dispatchEvent(new CustomEvent(ROLL_TICK, {
      detail: { 
        games: this.games.map((game: Game) => {
          game.tick()
          return game.toJSON();
        }),
        roll: this,
      }
    }));

    if (this.complete) {
      this.dispatcher.dispatchEvent(new CustomEvent(ROLL_COMPLETE, {
        detail: {
          games: this.games.map((game: Game) => {
            game.tick()
            return game.toJSON();
          }),
          roll: this,
        }
      }));
    } else {
      this.timeout = setTimeout(this.tick, 50);
    }
  }
}