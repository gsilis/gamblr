import { random, range } from "~/utilities/array";
import DiceRoll, {
  EVENT_PROGRESS,
  EVENT_VALUE,
  EVENT_COMPLETE,
  type AVAILABLE_EVENT,
  type DICE_VALUE,
} from "./dice-roll";

type RollListener = Record<AVAILABLE_EVENT, EventListenerOrEventListenerObject>;

/**
 * Rolls multiple die
 */
class DieRoll {
  private dispatcher: EventTarget;
  private running: boolean = false;
  private die: DiceRoll[] = [];
  private ranges: number[] = [];
  private finalValues: DICE_VALUE[] = [];
  private listeners: RollListener[] = [];

  constructor(ranges: number[]) {
    this.ranges = ranges;
    this.dispatcher = new EventTarget();
  }

  start(die: number) {
    if (this.running) {
      return;
    }

    this.die.forEach((diceRoll, index) => {
      const rollListeners = this.listeners[index] || ({} as RollListener);
      const assignedEvents = Object.keys(rollListeners) as AVAILABLE_EVENT[];

      assignedEvents.forEach((eventName: AVAILABLE_EVENT) => {
        const listener = rollListeners[eventName];

        diceRoll.removeEventListener(eventName, listener);
      });
    });

    this.die = [];
    this.finalValues = [];
    this.listeners = [];

    for (let i = 0; i < die; i++) {
      const dice = new DiceRoll(random(this.ranges));
      const onProgress = this.onProgress(i);
      const onValue = this.onValue(i);
      const onComplete = this.onComplete(i);

      dice.addEventListener(EVENT_PROGRESS, onProgress);
      dice.addEventListener(EVENT_COMPLETE, onComplete);
      dice.addEventListener(EVENT_VALUE, onValue);

      this.die.push(dice);
      this.listeners[i] = {
        [EVENT_PROGRESS]: onProgress,
        [EVENT_VALUE]: onValue,
        [EVENT_COMPLETE]: onComplete,
      };
    }

    this.running = true;
    this.die.forEach(d => d.start());
  }

  stop() {
    this.die.forEach(d => d.stop());
    this.running = false;
  }

  addEventListener(eventName: AVAILABLE_EVENT, listener: EventListenerOrEventListenerObject) {
    this.dispatcher.addEventListener(eventName, listener);
  }

  removeEventListener(eventName: AVAILABLE_EVENT, listener: EventListenerOrEventListenerObject) {
    this.dispatcher.removeEventListener(eventName, listener);
  }

  onValue = (_index: number): EventListenerOrEventListenerObject => {
    return (_event: Event) => {
      const values = this.die.map(d => d.value);

      this.dispatcher.dispatchEvent(new CustomEvent(EVENT_VALUE, { detail: { values } }));
    };
  }

  onProgress = (_index: number): EventListenerOrEventListenerObject => {
    return (_event: Event) => {
      const percentages = this.die.map(d => d.percentage);

      this.dispatcher.dispatchEvent(new CustomEvent(EVENT_PROGRESS, { detail: { percentages } }));
    };
  }

  onComplete = (index: number): EventListenerOrEventListenerObject => {
    return (_event: Event) => {
      const dice = this.die[index];

      this.finalValues[index] = dice.finalValue || 1;
      const allFinished = this.die.reduce((acc, die) => {
        return acc && die.percentage === 100;
      }, true);

      if (allFinished) {
        this.running = false;
        this.dispatcher.dispatchEvent(new CustomEvent(EVENT_COMPLETE, { detail: { values: this.finalValues } }));
      }
    };
  }

  values(die: number): DICE_VALUE[] {
    const arr = range(die);

    return arr.map((_v, i) => this.die[i]?.finalValue || 1);
  }

  progress(die: number): number[] {
    const arr = range(die);

    return arr.map((_v, i) => this.die[i]?.percentage || 0);
  }
}

export default DieRoll;