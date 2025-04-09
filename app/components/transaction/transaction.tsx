import type { TransactionType } from "~/types/transaction-type"
import Date, { FORMAT_FULL } from "../date/date";
import "./transaction.css";
import Currency from "../currency/currency";

const Transaction = ({ transaction }: { transaction: TransactionType }) => {
  return <div className="transaction" data-type={ transaction.category }>
    <span className="description">{ transaction.description }</span>
    <span className="category">{ transaction.category }</span>
    <span className="created">
      <Date date={ transaction.created } format={ FORMAT_FULL } />
    </span>
    <Currency className="amount" amount={ transaction.amount } />
  </div>;
}

export default Transaction;