import type { TransactionType } from "~/types/transaction-type"

const Transaction = ({ transaction }: { transaction: TransactionType }) => {
  return <div>
    <span className="description">{ transaction.description }</span>
    <span className="category">{ transaction.category }</span>
    <span className="created">{ transaction.created.toString() }</span>
    <span className="amount">{ transaction.amount }</span>
  </div>;
}

export default Transaction;