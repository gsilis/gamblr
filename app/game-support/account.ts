import { type Account as AccountInterface } from "~/interfaces/account";

class Account implements AccountInterface {
  constructor(
    private _balance: number = 0
  ) {}

  transact(amount: number): number {
    this._balance += amount;
    return this._balance;
  }

  get balance():number {
    return this._balance;
  }
}

export default Account;