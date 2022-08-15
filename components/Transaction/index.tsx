import style from './index.module.css'

export type Props = {
    transactionID: string
    amount: Number
    status: string // 'Deposit' | 'Withdraw'
}

export default function Transaction(props: Props) {
    return (
        <div className={style.container}>
            <div className={style.section}>
                <p className={style.label}>Date</p>
                <p className={style.transactionId}>{props.transactionID}</p>
            </div>
            <div className={style.section}>
                <p className={style.label}>Amount</p>
                <p className={style.amount}>{props.amount.toFixed(2)} DAI</p>
            </div>
            <div className={style.section}>
                <p className={style.label}>Type</p>
                <p
                    className={`${style.status} ${
                        style[props.status.toLocaleLowerCase()]
                    }`}
                >
                    {props.status}
                </p>
            </div>
        </div>
    )
}
