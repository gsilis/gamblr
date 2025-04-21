import { type Account as AccountInterface } from "~/interfaces/account";

class NullAccount implements AccountInterface {
  constructor(_balance: number = 0) {}

  transact(_amount: number): number {
    return 0;
  }

  get balance(): number {
    return 0;
  }
}

export default NullAccount;