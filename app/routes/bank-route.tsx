import Bank from "~/components/bank/bank";
import { use } from "react";
import { Navigate } from "react-router";
import { CityContext } from "~/contexts/city-context";

export default function BankRoute() {
  const cityContext = use(CityContext);
  const city = cityContext.city;

  if (city) {
    return <Bank />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}