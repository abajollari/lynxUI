import style from 'styles/LoginRegister.module.css'
import WaveAnimation from 'components/WaveAnimation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { store } from 'store'
import { setSecurity } from 'store/actions/security'
import { GUEST_ONLY } from 'store/types'

export default function Register() {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    useEffect(() => {
        store.dispatch(setSecurity(GUEST_ONLY))
    }, [])
    useEffect(() => {
        if (router.isReady) {
            setEmail(router.query.email.toString())
        }
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
                    <h1 className={style.headTitle}>Email Confirmation</h1>
                    <h2 className={style.headSubtitle}>
                        Please check your inbox at {email} for the confirmation
                        link
                    </h2>
                </div>
            </div>
        </div>
    )
}
