import { use } from "react";
import { Outlet } from "react-router";
import Balance from "~/components/balance/balance";
import { AccountContext } from "~/contexts/account-context";
import './play.css';

export default function Play() {
  const accountContext = use(AccountContext);

  if (!accountContext) {
    throw new Error('Cannot load profile context');
  }

  const balance = accountContext.balance;

  return <div className="play-layout">
    <Balance balance={ balance } />
    <hr className="divider" />
    <div className="main">
      <Outlet />
    </div>
  </div>;
}