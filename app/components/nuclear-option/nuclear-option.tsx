import type { CityKey } from "~/constants/city";

export type NuclearOptionProps = {
  city: CityKey,
  balance: number,
};

export default function NuclearOption(props: NuclearOptionProps) {
  return 'Nuclear Option';
}