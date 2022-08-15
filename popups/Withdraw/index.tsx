import { pushActionMessage } from 'store/actions/actionMessages'
import WaveAnimation from 'components/WaveAnimation'
import style from './index.module.css'
import QRCode from 'react-qr-code'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { store } from 'store'
import Client from 'client'
import Input from 'components/Input'
import { removePopup } from 'store/actions/popupMenager'
import { WITHDRAW_POPUP } from 'store/types'

export default function Withdraw() {
    const [WithdrawAmt, setWithdrawAmt] = useState<string>('')
    const apiClient = Client.getInstance()
    
    function handleWithdrawClick() {
        event.preventDefault()
        const apiClient = Client.getInstance()
        if (WithdrawAmt === '' || parseFloat(WithdrawAmt) <= 0) {
            store.dispatch(pushActionMessage('Please enter withdraw amount!'))
        } else {
            try {
                const response = apiClient.doWithdraw(parseFloat(WithdrawAmt))
                console.log(response)
                store.dispatch(removePopup(WITHDRAW_POPUP))
            } catch (error) {
                store.dispatch(
                    pushActionMessage(
                        error.response.data.message,
                        error.response.status
                    )
                )
            }
        }
    }

    return (
        <div className={style.container}>
            <WaveAnimation />
            <div className={style.wraper}>
                {<h1 className={style.title}>Withdraw</h1>}
                <img
                    className={style.image}
                    src="/svgs/Wallet.svg"
                    alt="Wallet image"
                />

                <div className={style.actionsContainer}>

                    <div>
                        <Input
                            type="number"
                            placeHolder="Amount"
                            state={[WithdrawAmt, setWithdrawAmt]}
                        />

                        <button
                            className={style.button}
                            onClick={() => handleWithdrawClick()}
                        >
                            Withdraw
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
