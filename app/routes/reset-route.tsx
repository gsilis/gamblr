import { use, useCallback } from "react";
import { Navigate, useNavigate } from "react-router";
import Reset from "~/components/reset/reset";
import type { City } from "~/constants/city";
import { AccountContext } from "~/contexts/account-context";
import { CityContext } from "~/contexts/city-context";

export default function ResetRoute() {
  const cityContext = use(CityContext);
  const accountContext = use(AccountContext);
  const navigate = useNavigate();

  const city = cityContext.city;
  const balance = accountContext.balance;

  const onCityPick = useCallback((city: City) => {
    cityContext.travel(city);
    accountContext.withdraw(1000);
    navigate('/play');
  }, [cityContext.travel, accountContext.withdraw, navigate]);

  if (city) {
    return (
      <Reset
        city={ city }
        balance={ balance }
        onSelect={ onCityPick }
        visitedCities={ cityContext.visitedCities }
      />
    );
  } else {
    return <Navigate to="/city-select" />
  }
}