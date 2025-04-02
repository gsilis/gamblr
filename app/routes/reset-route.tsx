import { use } from "react";
import { Navigate } from "react-router";
import Reset from "~/components/reset/reset";
import { ProfileContext } from "~/contexts/profile-context";

export default function ResetRoute() {
  const profile = use(ProfileContext);
  const city = profile.city;
  const balance = profile.balance;

  if (city) {
    return <Reset city={ city } balance={ balance } />
  } else {
    return <Navigate to="/city-select" />
  }
}