import { use } from "react";
import { Navigate } from "react-router";
import PawnShop from "~/components/pawn-shop/pawn-shop";
import { AccountContext } from "~/contexts/account-context";
import { CityContext } from "~/contexts/city-context";

export default function PawnShopRoute() {
  const cityContext = use(CityContext);
  const accountContext = use(AccountContext);

  const city = cityContext.city;
  const balance = accountContext.balance;

  if (city) {
    return <PawnShop city={ city } balance={ balance } />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}