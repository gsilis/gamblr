import Play from '../components/play/play';
import { use } from "react";
import { ProfileContext } from "~/profile-context";
import { Navigate } from "react-router";
import { TransactionContext } from '~/transaction-context';

export default function PlayRoute() {
  const profile = use(ProfileContext);
  const transactions = use(TransactionContext);

  if (profile?.city) {
    return <Play 
      city={ profile?.city }
      balance={ profile?.balance }
      transactions={ transactions?.transactions }
      addTransaction={ transactions?.addTransaction }
      createBank={ transactions?.createBank }
      createPawn={ transactions?.createPawn }
      createWin={ transactions?.createWin }
      createBet={ transactions?.createBet }
      credit={ profile?.credit }
      debit={ profile?.debit }
    />;
  } else {
    return <Navigate to="/city-picker" />;
  }
}
