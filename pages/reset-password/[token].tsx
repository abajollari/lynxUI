import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import Security from 'components/Security'
import Client from 'client'
import { store } from 'store'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'
import { pushActionMessage } from 'store/actions/actionMessages'

export default function Register() {
    const router = useRouter()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    async function handleReset(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (password.length === 0 || confirmPassword.length === 0) {
            store.dispatch(
                pushActionMessage('Please fill all the fields below!')
            )
        } else if (password !== confirmPassword) {
            store.dispatch(pushActionMessage('Passwords must match!'))
        } else if (password.length < 8) {
            store.dispatch(
                pushActionMessage(
                    'Password must be at least 8 characters long!'
                )
            )
        } else if (
            !password.match(/[a-z]+/) ||
            !password.match(/[A-Z]+/) ||
            !password.match(/[0-9]+/)
        ) {
            store.dispatch(
                pushActionMessage(
                    'Password must contain at least one upercase character, one lowercase character and one number!'
                )
            )
        } else {
            const apiClient = Client.getInstance()
            try {
                const response = await apiClient.resetPassword(
                    router.query.token,
                    password
                )
                store.dispatch(
                    pushActionMessage(
                        `Your password has been changed you can login now`,
                        response.status,
                        5000
                    )
                )
                router.push('/login')
            } catch (error) {
                store.dispatch(
                    pushActionMessage(
                        error.response.data.message,
                        error.response.status
                    )
                )
                if (error.response.status === 500) {
                    store.dispatch(
                        pushActionMessage(
                            'Please enter your email so we can send you an other token!',
                            error.response.status
                        )
                    )
                    router.push('/reset-password')
                }
            }
        }
    }

    return (
        <div className={style.container}>
            <WaveAnimation />
            <form
                className={style.formWraper}
                onSubmit={(event: FormEvent<HTMLFormElement>) =>
                    handleReset(event)
                }
            >
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/ResetPassword.svg"
                        alt="Login Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <h1 className={style.headTitle}>Enter your new password</h1>
                    <Input
                        type="password"
                        placeHolder="New password"
                        state={[password, setPassword]}
                    />
                    <Input
                        type="password"
                        placeHolder="Confirm new password"
                        state={[confirmPassword, setConfirmPassword]}
                    />
                    <div className={style.buttonContainer}>
                        <button className={style.button} type="submit">
                            Reset password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
