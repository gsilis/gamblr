import { type City } from "~/constants/city";
import Picker, { type PickerOption } from "../picker/picker";
import Cities from "~/constants/city";
import { useCallback, useMemo } from "react";
import { difference } from "~/utilities/array";

type ResetProps = {
  city: City,
  balance: number,
  onSelect: (city: City) => void,
  visitedCities: City[],
};

const options = Cities.map(city => {
  return {
    title: city,
    available: true,
    value: city,
  };
});

export default function Reset({
  onSelect,
  visitedCities,
}: ResetProps) {
  const onPick = useCallback((option: PickerOption) => {
    onSelect(option.value as City);
  }, [onSelect]);

  const availableCities = useMemo<PickerOption[]>(() => {
    const filtered = difference<City>(Cities, visitedCities);

    return options.filter(o => filtered.indexOf(o.value) > -1);
  }, [visitedCities.length, options]);

  return <>
    <Picker
      options={ availableCities }
      prompt={ 'Where do you want to go today?' }
      confirm={ 'Fly' }
      onSelect={ onPick }
    />
  </>;
}