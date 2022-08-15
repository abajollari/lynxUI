import { pushActionMessage } from 'store/actions/actionMessages'
import WaveAnimation from 'components/WaveAnimation'
import style from './index.module.css'
import QRCode from 'react-qr-code'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { store } from 'store'
import Client from 'client'
import { AxiosResponse } from 'axios'
import Input from 'components/Input'
import { removePopup } from 'store/actions/popupMenager'
import { WALLET_INFO } from 'store/types'
import router from 'next/router'

export default function WalletInfo() {
    const [walletKey, setWalletKey] = useState<string>('')
    const [depositAmt, setDepositAmt] = useState<string>('100')
    const [userEthBalance, setuserEthBalance] = useState('0.00')
    const [userTokenBalance, setuserTokenBalance] = useState('0.00')

    const apiClient = Client.getInstance()
    const walletKeyInput: MutableRefObject<HTMLInputElement> = useRef()
    useEffect(() => {
        async function fetchKey() {
            //const response = await apiClient.getWalletKey()
            //setWalletKey(response.data)
            apiClient.getWalletKey()
                .then(response => {
                    setWalletKey(response.data);
                    getUserEthBalance(response.data);
                    getUserTokenBalance(response.data);
            });
        }
        fetchKey()       
    }, [])


    function handleClick() {
        walletKeyInput.current.select()
        document.execCommand('copy')
        store.dispatch(pushActionMessage('Copied to clipboard', 0))
        store.dispatch(removePopup(WALLET_INFO))
    }
    
    async function handleDepositClick() {
        event.preventDefault()
        const apiClient = Client.getInstance()
        if (parseFloat(depositAmt) <= 0) {
            store.dispatch(pushActionMessage('Please enter deposit amount!'))
        } else {
            try {
                store.dispatch(removePopup(WALLET_INFO))
                //console.log(Date.now() + ' :start do deposit:')
                const response = await apiClient.doDeposit(parseFloat(depositAmt))
                //console.log(`${Date.now()} :done do deposit:${response}`)
                store.dispatch(
                    pushActionMessage(
                        'Your deposit has been completed.',
                        response.status
                    )
                )
                // router.push(`/dashboard`) //refresh page
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

    async function getUserEthBalance(usrAddr: string): Promise<void> {
        const apiClient = Client.getInstance()
        const response: AxiosResponse = await apiClient.getUserEthBalance(usrAddr)
        switch (response.status) {
            case 200:
                setuserEthBalance(response.data)
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

    async function getUserTokenBalance(usrAddr: string): Promise<void> {
        const apiClient = Client.getInstance()
        const response: AxiosResponse = await apiClient.getUserTokenBalance(usrAddr)
        switch (response.status) {
            case 200:
                setuserTokenBalance(response.data)
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
    return (
        <div className={style.container}>
            {/* <WaveAnimation /> */}
            <div className={style.wraper}>
                {/* <h1 className={style.title}>Wallet public key</h1> */}
                <img
                    className={style.image}
                    src="/svgs/Wallet.svg"
                    alt="Wallet image"
                />
                <div className={style.qrCodeContainer}>
                    <QRCode value={walletKey} bgColor="#ffffff00" />
                </div>
                <div className={style.actionsContainer}>
                    <div className={style.key}>Address: {walletKey}</div>
                    <div className={style.key}>ETH Balance: {userEthBalance}</div>
                    <div className={style.key}>Token Balance: {userTokenBalance}</div>
                    <input
                        className={style.hidden}
                        type="text"
                        defaultValue={walletKey}
                        ref={walletKeyInput}
                    />
                    <button
                        className={style.button}
                        onClick={() => handleClick()}
                    >
                        Copy to clipboard
                    </button>

                    <div>
                        <Input
                            type="number"
                            placeHolder="Amount"
                            state={[depositAmt, setDepositAmt]}
                        />

                        <button
                            className={style.button}
                            onClick={() => handleDepositClick()}
                        >
                            Deposit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
