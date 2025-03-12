import type { CityKey } from "~/constants/city";

type ResetProps = {
  city: CityKey,
  balance: number,
};

export default function Reset(resetProps: ResetProps) {
  return <>
    Reset
  </>;
}