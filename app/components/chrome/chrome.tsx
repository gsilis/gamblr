import { Outlet } from 'react-router';
import { use, useCallback, useState } from 'react';
import Logo from '../logo/logo';
import { Navigation } from '~/navigation/navigation';
import './chrome.css';
import { ProfileContext } from '~/profile-context';

export default function Chrome() {
  const context = use(ProfileContext);

  if (!context) {
    throw new Error('Whoa!');
  }

  const [balance, setBalance] = useState(100);
  const doBet = useCallback((amount: number): void => {
    console.log(`Betting ${amount}`);
  }, []);

  return <div className="application">
    <Logo city={ context.city } />
    <Navigation />
    <div className="app-window">
      <Outlet />
    </div>
  </div>;
}