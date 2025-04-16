import { use, useCallback, useMemo, useState } from "react";
import { createContext } from "react";
import { type Account as AccountInterface } from "~/interfaces/account";
import { FactoryContext } from "./factory-context";

interface AccountContextShape {
  balance: number,
  deposit(amount: number): void,
  withdraw(amount: number): void,
}

export const AccountContext = createContext<AccountContextShape>({
  balance: 0,
  deposit(_amount: number) {},
  withdraw(_amount: number) {},
});

export function AccountProvider({ children }: { children: any }) {
  const factoryContext = use(FactoryContext);

  const account = useMemo<AccountInterface>(() => {
    return factoryContext.accountFactory.createPersistentAccount('gambling-funds');
  }, [factoryContext.accountFactory]);

  const [balance, setBalance] = useState<number>(account.balance);

  const deposit = useCallback((amount: number) => {
    setBalance(account.transact(amount));
  }, [account.transact, setBalance]);

  const withdraw = useCallback((amount: number) => {
    setBalance(account.transact(-1 * amount));
  }, [account.transact, setBalance]);

  const api = {
    balance,
    deposit,
    withdraw,
  };

  return <AccountContext value={ api }>{ children }</AccountContext>;
}

export default { AccountContext, AccountProvider };