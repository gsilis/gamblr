import type { TransactionCategoryType } from './transaction-category-type';

export type TransactionType = {
  amount: number,
  description: string,
  category: TransactionCategoryType,
}