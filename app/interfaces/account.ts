export interface Account {
  transact(amount: number): number;
  get balance(): number;
}