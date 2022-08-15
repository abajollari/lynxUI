import { Popup } from 'classes/popup'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { WALLET_INFO, WITHDRAW_POPUP } from 'store/types'
import WalletInfo from 'popups/WalletInfo'
import Withdraw from 'popups/Withdraw'
import { store } from 'store'
import PopupCard from 'components/PopupCard'
import { useRouter } from 'next/router'
import { pushActionMessage } from 'store/actions/actionMessages'
import style from './index.module.css'

export default function PopupMenager() {
    const popups = useSelector(
        (state: RootState) => state.sessionStorage.popupReducer
    )
    const token = useSelector(
        (state: RootState) => state.sessionStorage.authReducer.token
    )
    const router = useRouter()
    const [activePopups, setActivePopups] = useState<JSX.Element[]>([])
    useEffect(() => {
        if (popups.length && !token) {
            router.push('/login')
            store.dispatch(pushActionMessage('You must login first!'))
        } else {
            setActivePopups(
                popups.map((popup: Popup) => {
                    switch (popup.identifier) {
                        case WALLET_INFO:
                            return (
                                <PopupCard
                                    zIndex={popup.zIndex}
                                    identifier={popup.identifier}
                                >
                                    <WalletInfo />
                                </PopupCard>
                            )
                        case WITHDRAW_POPUP:
                            return (
                                <PopupCard
                                    zIndex={popup.zIndex}
                                    identifier={popup.identifier}
                                >
                                    <Withdraw />
                                </PopupCard>
                            )
                    }
                })
            )
        }
    }, [popups, token])
    return <div className={style.wrapper}>{activePopups}</div>
}
