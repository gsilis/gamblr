import { use } from "react";
import { Outlet } from "react-router";
import Balance from "~/components/balance/balance";
import { ProfileContext } from "~/contexts/profile-context";
import './play.css';

export default function Play() {
  const profile = use(ProfileContext);

  if (!profile) {
    throw new Error('Cannot load profile context');
  }

  const balance = profile.balance;

  return <div className="play-layout">
    <Balance balance={ balance } />
    <hr className="divider" />
    <div className="main">
      <Outlet />
    </div>
  </div>;
}