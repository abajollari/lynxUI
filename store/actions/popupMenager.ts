import { PUSH_POPUP, REMOVE_POPUP } from 'store/types'
import { store } from 'store/index'

export function pushPopup(identifier: string) {
    const popupState = store.getState().sessionStorage.popupReducer
    return {
        type: PUSH_POPUP,
        zIndex:
            popupState.length === 0
                ? 100
                : Math.max.apply(
                      Math,
                      popupState.map((popup) => popup.zIndex)
                  ) + 1,
        identifier,
    }
}

export const removePopup = (identifier: string) => {
    return {
        type: REMOVE_POPUP,
        identifier,
    }
}
