import type Storage from "~/adapters/storage";
import Account from "~/game-support/account";
import { PersistentAccount } from "~/game-support/persistent-account";
import type { Account as AccountInterface } from "~/interfaces/account";
import { StorageFactory } from "./storage-factory";
import NullStorage from "~/adapters/null-storage";

export class AccountFactory {
  static default(): AccountFactory {
    return new AccountFactory(
      new NullStorage(),
      StorageFactory.default()
    );
  }

  constructor(
    private storage: Storage,
    private storageFactory: StorageFactory,
  ) {}

  createPersistentAccount(key: string, balance: number = 0): AccountInterface {
    const existingOrNewBalance = this.storage.retrieve(key, `${balance}`);
    const finalBalance = parseInt(existingOrNewBalance);
    let account: AccountInterface = new Account(finalBalance);
    account = new PersistentAccount(account, this.storageFactory.createNumericKeyedStorage(key));

    return account;
  }
}