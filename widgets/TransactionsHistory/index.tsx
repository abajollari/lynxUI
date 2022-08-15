import Transaction from "components/Transaction";
import style from "./index.module.css";
import {UserTrans} from "classes/usertrans";

type UserTransactions = {
  data: 
    UserTrans[]
}
// [{
//   transactionDate: string,
//   amount: number,
//   transactionType: string //'Deposit' | 'Withdraw'
// }]
export default function TransactionHistory(props: UserTransactions) {
  return (
    <div className={style.container}>
      <h3 className={style.title}>Transactions</h3>
      <div className={style.transactionsContainer}>
      {
        props.data.map(item => (
          <Transaction
          transactionID={item.transactionDate}
          amount={item.amount}
          status={item.transactionType}
        />
       ))
      }
  
        {/* <Transaction
          transactionID="01-May-2021"
          amount={94.00}
          status="Deposit"
        />
        <Transaction
          transactionID="24-Apr-2021"
          amount={289.00}
          status="Withdraw"
        /> */}

      </div>
    </div>
  );
}