import { PUSH_POPUP, REMOVE_POPUP } from 'store/types'
import { Popup } from 'classes/popup'

const popupState: Array<Popup> = []

export default function popupReducer(
    initialState = popupState,
    action: {
        type: string
        zIndex: number
        identifier: string
    }
) {
    switch (action.type) {
        case PUSH_POPUP:
            const popupToPush: Popup = {
                zIndex: action.zIndex,
                identifier: action.identifier,
            }
            return [...initialState, popupToPush]
        case REMOVE_POPUP:
            const newState = initialState.filter(
                (popup) => popup.identifier != action.identifier
            )
            return newState
        default:
            return initialState
    }
}
