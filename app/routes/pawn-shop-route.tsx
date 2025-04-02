import { use } from "react";
import { Navigate } from "react-router";
import PawnShop from "~/components/pawn-shop/pawn-shop";
import { ProfileContext } from "~/contexts/profile-context";

export default function PawnShopRoute() {
  const profile = use(ProfileContext);
  const city = profile.city;
  const balance = profile.balance;

  if (city) {
    return <PawnShop city={ city } balance={ balance } />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}