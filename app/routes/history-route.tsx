import History from "~/components/history/history";
import { use } from "react";
import { ProfileContext } from "~/contexts/profile-context";
import { Navigate } from "react-router";

export default function HistoryRoute() {
  const profile = use(ProfileContext);
  const city = profile.city;
  const balance = profile.balance;

  if (city) {
    return <History city={ city } balance={ balance } />;
  } else {
    return <Navigate to="/city-picker" />
  }
}