import type { CityKey } from "~/constants/city";

type CityPropTypes = {
  city: CityKey | null,
};

export default function City({ city }: CityPropTypes) {
  const cityName = city ? city as string : '';

  return <div className="city">
    <span>{ cityName }</span>
  </div>;
}