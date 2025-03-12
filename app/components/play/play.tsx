import type { CityKey } from "~/constants/city";

type PlayProps = {
  city: CityKey,
  balance: number,
};

export default function Play(playProps: PlayProps) {
  const {
    city,
    balance,
  } = playProps;

  return <>
    Play { city as string } - { balance }
  </>;
}