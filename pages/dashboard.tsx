import { useEffect, useState } from 'react'
import WaveAnimation from 'components/WaveAnimation'
import { store } from 'store'
import { setSecurity } from 'store/actions/security'
import { SECURE_ONLY } from 'store/types'
import style from 'styles/Dashboard.module.css'
import AccountInfo from 'widgets/AccountInfo'
import BalanceInfo from 'widgets/BalanceInfo'
import TransactionsHistory from 'widgets/TransactionsHistory'
import Client from 'client'
import { AxiosResponse } from 'axios'
import { pushActionMessage } from 'store/actions/actionMessages'
import {UserTrans} from "classes/usertrans";


export default function Dashboard() {
    var ut: UserTrans[] = [];
    const [userTransactions, setuserTransactions] = useState(ut) //<[{}]>([{}])
    const [walletKey, setWalletKey] = useState<string>('')
    const [userBalance, setUserBalance] = useState<number>(0.00)

    useEffect(() => {
        store.dispatch(setSecurity(SECURE_ONLY))
    }, [])

    async function fetchKey(apiClient) {
        const response = await apiClient.getWalletKey() 
        return response.data
    }

    async function getUserTransactions(): Promise<void> {
        const apiClient = Client.getInstance()

        const walletKeyA= await fetchKey(apiClient);
        console.log('ADR:' + walletKeyA)
        if (walletKeyA === '')
            return;
            
        const response: AxiosResponse = await apiClient.getUserTransactions(walletKeyA)
        switch (response.status) {
            case 200:
                setuserTransactions(response.data)
                break;
            default:
                store.dispatch(
                    pushActionMessage(
                        'Something went wrong please try again later!',
                        response.status
                    )
                )
        }
    }

    async function getUserBalance() {
        const apiClient = Client.getInstance()
        const response: AxiosResponse = await apiClient.getUserBalance()
        switch (response.status) {
            case 200:
                setUserBalance(response.data)
                break;
            default:
                store.dispatch(
                    pushActionMessage(
                        'Something went wrong getting balance. Please try again later!',
                        response.status
                    )
                )
        }
    }

    useEffect(() => {
        getUserTransactions(),
        getUserBalance()
    }, [])

    return (
        <div className={style.container}>
            <WaveAnimation />
            {/* <div className={style.userinfoContainer}>
                <AccountInfo />
            </div> */}
            <div className={style.balanceInfoContainer}>
                <BalanceInfo userBalance={userBalance.toFixed(2).toString()} />
            </div>
            <div className={style.transactionsHistoryContainer}>
                <TransactionsHistory data={userTransactions}/>
            </div>
            {/* <div>
                {userTransactions.map(item => (
                <li key={item.transactionType}>{item.transactionType}</li>
                ))}
            </div> */}
        </div>
    )
}
