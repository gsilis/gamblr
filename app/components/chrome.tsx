import { Outlet } from 'react-router';
import { Navigation } from '~/navigation/navigation';
import Balance from './balance';
import Bet from './bet';
import { useCallback, useState } from 'react';

export default function Chrome() {
  const [balance, setBalance] = useState(100);
  const doBet = useCallback((amount: number): void => {
    console.log(`Betting ${amount}`);
  }, []);

  return <>
    <Navigation />
    <div>
      <Balance balance={ balance } />
    </div>
    <Outlet />
  </>;
}