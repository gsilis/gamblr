import type { Account } from "~/interfaces/account";
import type { SimpleStorage } from "~/interfaces/simple-storage";

export class PersistentAccount implements Account {
  constructor(
    private account: Account,
    private storage: SimpleStorage<number>,
  ) {}

  transact(amount: number): number {
    const newBalance = this.account.transact(amount);

    this.storage.save(amount);

    return newBalance;
  }

  get balance(): number {
    return this.account.balance;
  }
}