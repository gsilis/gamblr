import { use } from "react";
import { Navigate, useNavigate } from "react-router";
import NuclearOption from "~/components/nuclear-option/nuclear-option";
import { AccountContext } from "~/contexts/account-context";
import { CityContext } from "~/contexts/city-context";

export default function NuclearOptionRoute() {
  const cityContext = use(CityContext);
  const accountContext = use(AccountContext);

  const city = cityContext.city;
  const balance = accountContext.balance;
  const navigate = useNavigate();

  if (city) {
    return <NuclearOption city={ city } balance={ balance } />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}