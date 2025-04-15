import { use } from "react";
import { Navigate } from "react-router";
import Reset from "~/components/reset/reset";
import { AccountContext } from "~/contexts/account-context";
import { CityContext } from "~/contexts/city-context";

export default function ResetRoute() {
  const cityContext = use(CityContext);
  const accountContext = use(AccountContext);

  const city = cityContext.city;
  const balance = accountContext.balance;

  if (city) {
    return <Reset city={ city } balance={ balance } />
  } else {
    return <Navigate to="/city-select" />
  }
}