import type { TransactionKey } from "~/constants/transaction"

export type TransactionType = {
  amount: number,
  description: string,
  category: TransactionKey,
  created: Date,
}