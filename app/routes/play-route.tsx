import Play from '../components/play/play';
import { use } from "react";
import { ProfileContext } from "~/profile-context";
import { Navigate } from "react-router";

export default function PlayRoute() {
  const profile = use(ProfileContext);
  const city = profile?.city;
  const balance = profile?.balance;

  if (city) {
    return <Play city={ city } balance={ balance } />
  } else {
    return <Navigate to="/city-picker" />;
  }
}
