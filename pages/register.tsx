import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Input from 'components/Input'
import Link from 'components/LinkWithLocalization'
import User from 'classes/user'
import Client from 'client'
import { store } from 'store'
import { useState, FormEvent, useEffect } from 'react'
import { pushActionMessage } from 'store/actions/actionMessages'
import { useRouter } from 'next/router'
import { setSecurity } from 'store/actions/security'
import { GUEST_ONLY } from 'store/types'

export default function Register() {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        store.dispatch(setSecurity(GUEST_ONLY))
    }, [])

    function clearForm() {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setPrivacyAccepted(false)
    }

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
        ) {
            store.dispatch(
                pushActionMessage('Please fill all the fields below!')
            )
        } else if (password !== confirmPassword) {
            store.dispatch(pushActionMessage('Passwords must match!'))
        } else if (
            password.length < 8 ||
            !password.match(/[a-z]+/) ||
            !password.match(/[A-Z]+/) ||
            !password.match(/[0-9]+/)
        ) {
            store.dispatch(
                pushActionMessage(
                    'Password must be at least 8 characters long and must contain at least one upercase character, one lowercase character and one number!',
                    null,
                    5000
                )
            )
        } else if (!privacyAccepted) {
            store.dispatch(pushActionMessage('Please accept privacy policy!'))
        } else {
            setLoading(true)
            const userToRegister = new User(email, password)
            const apiClient = Client.getInstance()
            try {
                const response = await apiClient.registerUser(userToRegister)
                clearForm()
                router.push(`/email-send?email=${response.data.email}`)
            } catch (error) {
                store.dispatch(
                    pushActionMessage(
                        error.response.data.message,
                        error.response.status
                    )
                )
                clearForm()
            }
            setLoading(false)
        }
    }

    return (
        <div className={style.container}>
            <WaveAnimation />
            <form
                className={style.formWraper}
                onSubmit={(event: FormEvent<HTMLFormElement>) =>
                    handleRegister(event)
                }
            >
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/Register.svg"
                        alt="Register Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <div className={style.textContainer}>
                        {/* <h1 className={style.headTitle}>Register Now</h1> */}
                        <h2 className={style.headSubtitle}>
                            Register now and start earning
                        </h2>
                    </div>
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
                    <Input
                        type="password"
                        placeHolder="Confirm Password"
                        state={[confirmPassword, setConfirmPassword]}
                    />
                    <div className={style.checkWraper}>
                        <input
                            type="checkbox"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPrivacyAccepted(event.target.checked)}
                            checked={privacyAccepted}
                        />
                        <label className={style.label}>
                            I certify that I am 18 years of age or older, and
                            agree to the{' '}
                            <Link href="/user-agreement">
                                <span className={style.link}>
                                    User Agreement
                                </span>
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy-policy">
                                <span className={style.link}>
                                    Privacy Policy
                                </span>
                            </Link>
                        </label>
                    </div>
                    <div className={style.buttonContainer}>
                        <button className={style.button} type="submit" disabled={loading}>
                            Register
                            { loading && <b> ...</b> }                          
                        </button>

                        <label className={style.info}>
                            Already have an account?
                            <Link href="/login">
                                <span className={style.infoLink}>Log In</span>
                            </Link>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
