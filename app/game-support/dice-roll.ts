import { random } from "~/utilities/array";

export const EVENT_PROGRESS = 'event-progress';
export const EVENT_VALUE = 'event-value';
export const EVENT_COMPLETE = 'event-complete';

export type DICE_VALUE = 1 | 2 | 3 | 4 | 5 | 6;
export type AVAILABLE_EVENT = typeof EVENT_PROGRESS | typeof EVENT_VALUE | typeof EVENT_COMPLETE;
const TICK_SPEED = 100;
const faces: DICE_VALUE[] = [1, 2, 3, 4, 5, 6];

/**
 * A single dice roll. Pass the total sequences to the constructor.
 * This object is not built to be re-used, as the cycles cannot be
 * changed after initialization.
 */
class DiceRoll {
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private cycle: number;
  private dispatcher: EventTarget;
  private _value?: DICE_VALUE;

  constructor(
    private cycles: number,
  ) {
    this.cycle = 0;
    this.dispatcher = new EventTarget();
  }

  get value(): DICE_VALUE | void {
    return this._value;
  }

  get percentage(): number {
    return Math.ceil(((this.cycle || 0) / (this.cycles || 1)) * 100);
  }

  get finalValue(): DICE_VALUE | void {
    if (this.timeout) {
      return void 0;
    } else {
      return this.value;
    }
  }

  start = () => {
    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(this.tick, TICK_SPEED);
  }

  stop = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  tick = () => {
    this.cycle += 1;
    this._value = random<DICE_VALUE>(faces, this._value != null ? this._value : void 0);
    let event: CustomEvent;

    this.dispatcher.dispatchEvent(new CustomEvent(EVENT_PROGRESS, { detail: { cycles: this.cycles, cycle: this.cycle } }));
    this.dispatcher.dispatchEvent(new CustomEvent(EVENT_VALUE, { detail: { value: this._value } }));

    if (this.cycle >= this.cycles) {
      this.timeout = null;
      this.dispatcher.dispatchEvent(new CustomEvent(EVENT_COMPLETE, { detail: { value: this._value } }));
    } else {
      this.timeout = setTimeout(this.tick, TICK_SPEED);
    }
  }

  addEventListener(name: AVAILABLE_EVENT, listener: EventListenerOrEventListenerObject) {
    this.dispatcher.addEventListener(name, listener);
  }

  removeEventListener(name: AVAILABLE_EVENT, listener: EventListenerOrEventListenerObject) {
    this.dispatcher.removeEventListener(name, listener);
  }
}

export default DiceRoll;