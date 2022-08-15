import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import Client from 'client'
import Security from 'components/Security'
import { useState, useEffect } from 'react'
import { pushActionMessage } from 'store/actions/actionMessages'
import { useRouter } from 'next/router'
import { store } from 'store'

export default function Register() {
    const router = useRouter()
    const [status, setStatus] = useState<string>('verifying')

    useEffect(() => {
        async function verifyEmail() {
            const apiClient = Client.getInstance()
            if (router.isReady) {
                try {
                    const response = await apiClient.verifyEmail(
                        router.query.email,
                        router.query.token
                    )
                    store.dispatch(
                        pushActionMessage(
                            `${response.data.verifiedUser.email}  has been verified`,
                            response.status,
                            5000
                        )
                    )
                    setStatus('verified')
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                } catch (error) {
                    setStatus(error.response.data.message)
                    if (error.response.status === 500) {
                        try {
                            const resendResponse =
                                await apiClient.resendEmailVerification(
                                    router.query.email
                                )
                            store.dispatch(
                                pushActionMessage(
                                    resendResponse.data.message,
                                    resendResponse.status
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
                            if (error.response.status === 400) {
                                router.push('/login')
                            }
                        }
                    } else {
                        store.dispatch(
                            pushActionMessage(
                                error.response.data.message,
                                error.response.status
                            )
                        )
                    }
                }
            }
        }
        verifyEmail()
    }, [router])

    return (
        <div className={style.container}>
            <WaveAnimation />
            <div className={style.formWraper}>
                <div className={style.imageContainer}>
                    <img
                        className={style.image}
                        src="/svgs/Email.svg"
                        alt="Login Image"
                    />
                </div>
                <div className={style.formContainer}>
                    <h1 className={style.headTitle}>Email status:</h1>
                    <h2 className={style.headTitle}>{status}</h2>
                </div>
            </div>
        </div>
    )
}
