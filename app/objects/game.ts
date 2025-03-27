import { random } from "~/utilities/array";

export type RollNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type GameData = {
  cycles: number,
  cycle: number,
  value: RollNumber | null,
};

export class Game {
  private cycle: number;
  private value: RollNumber | null = null;

  constructor(private cycles: number) {
    this.cycle = 0;
  }

  get running(): boolean {
    return this.cycle < this.cycles;
  }

  get finalValue(): number | null {
    return this.running ? null : this.value;
  }

  tick() {
    if (this.cycle < this.cycles) {
      return;
    }

    this.value = random<RollNumber>([1, 2, 3, 4, 5, 6]);
    this.cycle++;
  }

  toJSON(): GameData {
    return {
      cycle: this.cycle,
      cycles: this.cycles,
      value: this.value,
    };
  }
}