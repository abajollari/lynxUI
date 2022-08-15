import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import Client from 'client'
import Security from 'components/Security'
import { store } from 'store'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import { pushActionMessage } from 'store/actions/actionMessages'

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')

    async function handleEmailSend(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (email.length === 0) {
            store.dispatch(pushActionMessage('Please please enter your email!'))
        } else {
            const apiClient = Client.getInstance()
            try {
                const response = await apiClient.sendResetPasswordEmail(email)
                store.dispatch(
                    pushActionMessage(
                        `Please check your inbox at ${response.data.email} to confirm your email`,
                        response.status,
                        5000
                    )
                )
                router.push('/')
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
                    handleEmailSend(event)
                }
            >
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/ResetPassword.svg"
                        alt="Reset Password"
                    />
                </div>
                <div className={style.formContainer}>
                    <h2 className={style.headSubtitle}>
                        Password Reset
                    </h2>
                    <>
                        <Input
                            type="text"
                            placeHolder="Email"
                            state={[email, setEmail]}
                        />
                        <div className={style.buttonContainer}>
                            <button className={style.button}>Send Verification Email</button>
                        </div>
                    </>
                </div>
            </form>
        </div>
    )
}
