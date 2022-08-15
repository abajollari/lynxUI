import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Link from 'components/LinkWithLocalization'
import User from 'classes/user'
import Client from 'client'
import { store } from 'store'
import { storeToken } from 'store/actions/auth'
import { pushActionMessage } from 'store/actions/actionMessages'
import { rememberMe } from 'store/actions/settings'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { SettingsState } from 'store/reducers/settings'
import { setSecurity } from 'store/actions/security'
import { GUEST_ONLY } from 'store/types'

export default function Login() {
    const router = useRouter()
    const settings: SettingsState = useSelector(
        (state: RootState) => state.localStorage.settingsReducer
    )
    const [email, setEmail] = useState<string>(settings.rememberMe.email)
    const [password, setPassword] = useState<string>('')
    const [rememberMeValue, setRememberMeValue] = useState<boolean>(
        settings.rememberMe.value
    )
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        store.dispatch(setSecurity(GUEST_ONLY))
    }, [])

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (email.length === 0 || password.length === 0) {
            store.dispatch(
                pushActionMessage('Please fill all the fields below!')
            )
        } else {
            const userToLogin = new User(email, password)
            const apiClient = Client.getInstance()
            setLoading(true)
            try {
                const response = await apiClient.loginUser(userToLogin)
                console.log(response)
                router.push(
                    router.query.redirect
                        ? router.query.redirect.toString()
                        : '/dashboard'
                )
                store.dispatch(
                    storeToken(
                        response.data.token,
                        response.data.refreshToken,
                        response.data.kyc,
                        response.data.firstName,
                        email
                    )
                )
                if (rememberMeValue) {
                    store.dispatch(rememberMe(email, rememberMeValue))
                }
            } catch (error) {
                setLoading(false)
                if (!error.response) { //response undefined --arian
                    // Show a generic error Toast (e.g. Server error, please retry)
                    store.dispatch(
                        pushActionMessage(
                            'An error has occurred, please try again later!',
                            400
                        )
                    )
                    return;
                  }
                if (error.response.status === 500) {
                    try {
                        const response =
                            await apiClient.resendEmailVerification(email)
                        store.dispatch(
                            pushActionMessage(
                                response.data.message,
                                response.status
                            )
                        )
                    } catch (error) {
                        store.dispatch(
                            pushActionMessage(
                                error.response.data.message,
                                error.response.status
                            )
                        )
                    }
                }
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
                    handleLogin(event)
                }
            >
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/Login.svg"
                        alt="Login Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <h2 className={style.headSubtitle}>
                        Log In to Lynx
                    </h2>
                    <Input
                        type="email"
                        placeHolder="Email"
                        state={[email, setEmail]}
                        focus
                    />
                    <Input
                        type="password"
                        placeHolder="Password"
                        state={[password, setPassword]}
                    />
                    <div className={style.checkWraper}>
                        <input
                            id="rememberMe"
                            type="checkbox"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setRememberMeValue(event.target.checked)
                            }
                            checked={rememberMeValue}
                        />
                        <label className={style.label} htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>
                    <div className={style.buttonContainer}>
                        <button className={style.button} type="submit" disabled={loading}>
                            Login
                            { loading && <b> ...</b> }                          
                        </button>
                        <Link href="/reset-password">
                            <span className={style.note}>
                                Forgot password
                            </span>
                        </Link>
                        <label className={style.info}>
                            Don't have an account?
                            <Link href="/register">
                                <span className={style.infoLink}>
                                    Register now
                                </span>
                            </Link>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
