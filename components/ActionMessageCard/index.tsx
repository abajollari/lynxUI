import style from './index.module.css'
import { ActionMessage } from 'classes/actionMessage'
import { store } from 'store'
import { removeActionMessage } from 'store/actions/actionMessages'
import { useEffect, useState } from 'react'

type Props = {
    action: ActionMessage
}

export default function ActionMessageCard(props: Props) {
    const [animationClass, setAnimationClass] = useState<string>(style.insert)

    useEffect(() => {
        setTimeout(() => {
            setAnimationClass('')
        }, 10)
        const autoRemover = setTimeout(() => {
            setAnimationClass(style.remove)
        }, props.action.displayDuration - 300)
        return () => {
            clearTimeout(autoRemover)
        }
    }, [])

    const handleRemoval = () => {
        setAnimationClass(style.remove)
        return setTimeout(() => {
            store.dispatch(removeActionMessage(props.action.identifier))
        }, 300)
    }

    return (
        <div
            className={`${style.messageContainer} ${animationClass} ${
                props.action.success ? style.success : style.error
            }`}
        >
            {props.action.statusCode ? (
                <h3 className={style.status}>
                    Status: {props.action.statusCode}
                </h3>
            ) : null}
            <svg
                className={style.close}
                onClick={handleRemoval}
                viewBox="0 0 413.348 413.348"
            >
                <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
            </svg>
            <h2 className={style.message}>{props.action.message}</h2>
        </div>
    )
}
