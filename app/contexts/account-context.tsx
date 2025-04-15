import { use, useCallback, useMemo } from "react";
import { createContext } from "react";
import type { Account as AccountInterface } from "~/interfaces/account";
import { FactoryContext } from "./factory-context";

interface AccountContextShape {
  balance: number,
  deposit(amount: number): number,
  withdraw(amount: number): number,
}

export const AccountContext = createContext<AccountContextShape>({
  balance: 0,
  deposit(_amount: number) { return 0; },
  withdraw(_amount: number) { return 0; },
});

export function AccountProvider({ children }: { children: any }) {
  const factoryContext = use(FactoryContext);

  const account = useMemo<AccountInterface>(() => {
    return factoryContext.accountFactory.createPersistentAccount('gambling-funds');
  }, [factoryContext.accountFactory]);

  const deposit = useCallback((amount: number): number => {
    return account.transact(amount);
  }, [account]);

  const withdraw = useCallback((amount: number): number => {
    return account.transact(-1 * amount);
  }, []);

  const api = { balance: account.balance, deposit, withdraw };

  return <AccountContext value={ api }>{ children }</AccountContext>;
}

export default { AccountContext, AccountProvider };