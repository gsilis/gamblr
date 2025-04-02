import { use } from "react";
import { Navigate, useNavigate } from "react-router";
import NuclearOption from "~/components/nuclear-option/nuclear-option";
import { ProfileContext } from "~/contexts/profile-context";

export default function NuclearOptionRoute() {
  const profile = use(ProfileContext);
  const city = profile.city;
  const balance = profile.balance;
  const navigate = useNavigate();

  if (city) {
    return <NuclearOption city={ city } balance={ balance } />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}