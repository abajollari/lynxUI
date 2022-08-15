import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import { useState, useEffect, FormEvent } from 'react'
import Link from 'components/LinkWithLocalization'

import { store } from 'store'

import { setSecurity } from 'store/actions/security'
import { SECURE_ONLY } from 'store/types'
import Client from 'client'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { pushActionMessage } from 'store/actions/actionMessages'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const senderEmail = useSelector(
        (state: RootState) => state.sessionStorage.authReducer.email
    )

    useEffect(() => {
        store.dispatch(setSecurity(SECURE_ONLY))
    }, [])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const apiClient = Client.getInstance()
        if (email.length === 0) {
            store.dispatch(pushActionMessage('Please enter recivers email!'))
        } else {
            try {
                const response = await apiClient.send(
                    senderEmail,
                    parseFloat(amount),
                    email
                )
                console.log(response)
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
            <form
                className={style.formWraper}
                onSubmit={(event: FormEvent<HTMLFormElement>) =>
                    handleSubmit(event)
                }
            >
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/Send.svg"
                        alt="Login Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <h1 className={style.headTitle}>Send</h1>
                    <Input
                        type="email"
                        placeHolder="Receiver email"
                        state={[email, setEmail]}
                        focus
                    />
                    <Input
                        type="number"
                        placeHolder="Amount"
                        state={[amount, setAmount]}
                    />
                    <div className={style.buttonContainer}>
                        <button className={style.button} type="submit">
                            Send Now
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
