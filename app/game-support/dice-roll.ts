import { random } from "~/utilities/array";

export const EVENT_PROGRESS = 'event-progress';
export const EVENT_VALUE = 'event-value';
export const EVENT_COMPLETE = 'event-complete';

type DICE_VALUE = 1 | 2 | 3 | 4 | 5 | 6;
type AVAILABLE_EVENT = typeof EVENT_PROGRESS | typeof EVENT_VALUE | typeof EVENT_COMPLETE;
const TICK_SPEED = 100;
const faces: DICE_VALUE[] = [1, 2, 3, 4, 5, 6];

class DiceRoll {
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private cycle: number;
  private dispatcher: EventTarget;
  private value?: DICE_VALUE;

  constructor(
    private cycles: number,
  ) {
    this.cycle = 0;
    this.dispatcher = new EventTarget();
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
    this.value = random<DICE_VALUE>(faces, this.value != null ? this.value : void 0);
    let event: CustomEvent;

    this.dispatcher.dispatchEvent(new CustomEvent(EVENT_PROGRESS, { detail: { cycles: this.cycles, cycle: this.cycle } }));
    this.dispatcher.dispatchEvent(new CustomEvent(EVENT_VALUE, { detail: { value: this.value } }));

    if (this.cycle >= this.cycles) {
      this.dispatcher.dispatchEvent(new CustomEvent(EVENT_COMPLETE, { detail: { value: this.value } }));
      this.timeout = null;
    } else {
      this.timeout = setTimeout(this.tick, TICK_SPEED);
    }
  }

  addEventListener(name: AVAILABLE_EVENT, listener: (event: Event) => void) {
    this.dispatcher.addEventListener(name, listener);
  }

  removeEventListener(name: AVAILABLE_EVENT, listener: (event: Event) => void) {
    this.dispatcher.removeEventListener(name, listener);
  }
}

export default DiceRoll;