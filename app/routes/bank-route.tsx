import Bank from "~/components/bank/bank";
import { use } from "react";
import { Navigate } from "react-router";
import { ProfileContext } from "~/contexts/profile-context";

export default function BankRoute() {
  const profile = use(ProfileContext);
  const city = profile.city;

  if (city) {
    return <Bank />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}