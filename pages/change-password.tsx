import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Client from 'client'
import { store } from 'store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { SettingsState } from 'store/reducers/settings'
import { setSecurity } from 'store/actions/security'
import { SECURE_ONLY } from 'store/types'
import { pushActionMessage } from 'store/actions/actionMessages'

export default function Login() {
    const router = useRouter()
    const settings: SettingsState = useSelector(
        (state: RootState) => state.localStorage.settingsReducer
    )
    const [newPassword, setNewPassword] = useState<string>('')
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('')
    const email: string = useSelector(
        (state: RootState) => state.sessionStorage.authReducer.email
    )

    useEffect(() => {
        store.dispatch(setSecurity(SECURE_ONLY))
    }, [])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (newPassword.length === 0 || repeatNewPassword.length === 0) {
            store.dispatch(
                pushActionMessage('Please fill all the fields below!')
            )
        } else if (newPassword !== repeatNewPassword) {
            store.dispatch(pushActionMessage('Passwords must match!'))
        } else if (
            newPassword.length < 8 ||
            !newPassword.match(/[a-z]+/) ||
            !newPassword.match(/[A-Z]+/) ||
            !newPassword.match(/[0-9]+/)
        ) {
            store.dispatch(
                pushActionMessage(
                    'Password must be at least 8 characters long and must contain at least one upercase character, one lowercase character and one number!',
                    null,
                    5000
                )
            )
        } else {
            const apiClient = Client.getInstance()
            try {
                const response = await apiClient.changePassword(newPassword)
                store.dispatch(
                    pushActionMessage('Password changed successfully', 0)
                )
                router.push('/dashboard')
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
                        src="/svgs/ChangePassword.svg"
                        alt="Login Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <h1 className={style.headTitle}>Change password</h1>
                    <Input
                        type="password"
                        placeHolder="New Password"
                        state={[newPassword, setNewPassword]}
                    />
                    <Input
                        type="password"
                        placeHolder="Repeat new Password"
                        state={[repeatNewPassword, setRepeatNewPassword]}
                    />
                    <div className={style.buttonContainer}>
                        <button className={style.button} type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
