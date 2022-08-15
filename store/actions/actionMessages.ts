import { PUSH_MESSAGE, REMOVE_MESSAGE } from 'store/types'
import { ActionMessage } from 'classes/actionMessage'
import { store } from 'store/index'

const actionOnDispalyTime = parseInt(process.env.actionOnDispalyTime)

export function pushActionMessage(
    message: string,
    statusCode: number = null,
    displayDuration = actionOnDispalyTime
) {
    const action: ActionMessage = {
        message,
        statusCode,
        success:
            (statusCode >= 200 && statusCode < 300) || statusCode === 0
                ? true
                : false,
        displayDuration,
        identifier: Date.now(),
    }
    setTimeout(() => {
        store.dispatch(removeActionMessage(action.identifier))
    }, displayDuration)
    return {
        type: PUSH_MESSAGE,
        content: action,
    }
}

export const removeActionMessage = (identifier: number) => {
    return {
        type: REMOVE_MESSAGE,
        identifier,
    }
}
