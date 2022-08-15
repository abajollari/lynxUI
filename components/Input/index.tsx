import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import style from './index.module.css'

type InputProps = {
    type: string | any
    placeHolder: string
    state: [string, Dispatch<SetStateAction<string>>]
    children?: JSX.Element | JSX.Element[]
    focus?: boolean
}

export default function Input(props: InputProps) {
    const [getValue, setValue] = props.state
    const [active, setActive] = useState<boolean>(
        props.type === 'date' ? true : false
    )
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (props.focus) {
            inputRef.current.focus()
            setActive(true)
        }
    }, [])

    useEffect(() => {
        setActive(
            getValue.length !== 0 || document.activeElement === inputRef.current
                ? true
                : false
        )
    }, [getValue])

    if (props.type === 'date') {
        useEffect(() => {
            setActive(true)
        }, [active])
    } else if (props.type === 'select') {
        return (
            <div className={style.container}>
                <label
                    className={`${style.label} ${active ? style.active : ''}`}
                >
                    {props.placeHolder}
                </label>
                <select
                    className={style.input}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setValue(event.target.value)
                    }
                    onFocus={() => setActive(true)}
                    onBlur={() =>
                        setActive(getValue.length !== 0 ? true : false)
                    }
                    value={getValue}
                >
                    {props.children}
                </select>
            </div>
        )
    }

    return (
        <div className={style.container}>
            <label className={`${style.label} ${active ? style.active : ''}`}>
                {props.placeHolder}
            </label>
            <input
                className={style.input}
                type={props.type}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(event.target.value)
                }
                ref={inputRef}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(getValue.length !== 0 ? true : false)}
                value={getValue}
            />
        </div>
    )
}
