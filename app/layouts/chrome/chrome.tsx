import Logo from '../../components/logo/logo';
import { Outlet } from 'react-router';
import { useCallback, useState } from 'react';
import { Navigation } from '~/navigation/navigation';
import './chrome.css';

export default function Chrome() {
  const [balance, setBalance] = useState(100);
  const doBet = useCallback((amount: number): void => {
    console.log(`Betting ${amount}`);
  }, []);

  return <div className="application">
    <Logo />
    <Navigation />
    <div className="app-window">
      <Outlet />
    </div>
  </div>;
}