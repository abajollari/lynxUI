import { useSelector } from 'react-redux'

import style from './index.module.css'
import { ActionMessage } from 'classes/actionMessage'
import ActionMessageCard from 'components/ActionMessageCard'

import { RootState } from 'store/reducers'

export default function Error() {
    const actions: Array<ActionMessage> = useSelector(
        (state: RootState) => state.sessionStorage.actionMessagesReducer
    )
    return (
        <div className={style.cardContainer}>
            {actions.map((action) => (
                <ActionMessageCard action={action} key={action.identifier} />
            ))}
        </div>
    )
}
