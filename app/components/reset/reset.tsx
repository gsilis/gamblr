import type { City } from "~/constants/city";
import Picker from "../picker/picker";
import Cities from "~/constants/city";

type ResetProps = {
  city: City,
  balance: number,
};

const options = Cities.map(city => {
  return {
    title: city,
    available: true,
    value: city,
  };
});

export default function Reset(resetProps: ResetProps) {
  return <>
    <Picker
      options={ options }
      prompt={ 'Where do you want to go today?' }
      confirm={ 'Fly' }
      onSelect={ () => {} }
    />
  </>;
}