import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from 'store'
import { pushActionMessage } from 'store/actions/actionMessages'
import { RootState } from 'store/reducers'
import { GUEST_ONLY, PUBLIC, REGISTERED_ONLY, SECURE_ONLY } from 'store/types'

type SecurityProps = {
    children: JSX.Element
}

export default function Security(props: SecurityProps) {
    const router = useRouter()
    const securityRule: string = useSelector(
        (state: RootState) => state.sessionStorage.securityReducer.security
    )
    const authStatus: boolean = useSelector((state: RootState) =>
        state.sessionStorage.authReducer.token ? true : false
    )
    const kycStatus: boolean = useSelector(
        (state: RootState) => state.sessionStorage.authReducer.kycStatus
    )
    useEffect(() => {
        const curentUrl = router.pathname
        switch (securityRule) {
            case REGISTERED_ONLY:
                if (!authStatus) {
                    store.dispatch(pushActionMessage('You shuld login first!'))
                    router.push(`/login?redirect=${curentUrl}`)
                } else if (kycStatus) {
                    store.dispatch(
                        pushActionMessage(
                            'You have already completed the registration!'
                        )
                    )
                    router.push(`/dashboard`)
                }
                break
            case SECURE_ONLY:
                if (!authStatus) {
                    store.dispatch(pushActionMessage('You shuld login first!'))
                    router.push(`/login?redirect=${curentUrl}`)
                } else if (!kycStatus) {
                    store.dispatch(
                        pushActionMessage(
                            'Please complete the registration process!'
                        )
                    )
                    router.push(`/user-info?redirect=${curentUrl}`)
                }
                break
            case GUEST_ONLY:
                if (authStatus) {
                    store.dispatch(
                        pushActionMessage('You are already loged in!')
                    )
                    router.push('/dashboard')
                }
                break
            case PUBLIC:
                break
            default:
                store.dispatch(
                    pushActionMessage(
                        'Something went wrong you have been redirected to home!'
                    )
                )
                router.push('/')
                break
        }
    }, [securityRule])

    return props.children
}
