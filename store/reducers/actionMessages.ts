import { PUSH_MESSAGE, REMOVE_MESSAGE } from 'store/types'
import { ActionMessage } from 'classes/actionMessage'

const actionMessagesState: Array<ActionMessage> = []

export default function actionsReducer(
    initialState = actionMessagesState,
    action: {
        type: string
        content?: ActionMessage
        identifier?: number
    }
) {
    switch (action.type) {
        case PUSH_MESSAGE:
            return [...initialState, action.content]
        case REMOVE_MESSAGE:
            const newState = initialState.filter(
                (message) => message.identifier != action.identifier
            )
            return newState
        default:
            return initialState
    }
}
