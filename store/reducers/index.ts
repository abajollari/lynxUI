import { combineReducers } from 'redux'

import auth from 'store/reducers/auth'
import actionMessages from 'store/reducers/actionMessages'
import settings from 'store/reducers/settings'
import security from 'store/reducers/security'
import popupMenager from 'store/reducers/popupMenager'

import { AuthState } from 'store/reducers/auth'
import { ActionMessage } from 'classes/actionMessage'
import { SettingsState } from 'store/reducers/settings'
import { SecurityState } from 'store/reducers/security'
import { Popup } from 'classes/popup'

export type RootState = {
    localStorage: {
        settingsReducer: SettingsState
    }
    sessionStorage: {
        authReducer: AuthState
        actionMessagesReducer: Array<ActionMessage>
        securityReducer: SecurityState
        popupReducer: Array<Popup>
    }
}

export const localStorageReducer = combineReducers({
    settingsReducer: settings,
})

export const sessionStorageReducer = combineReducers({
    actionMessagesReducer: actionMessages,
    authReducer: auth,
    securityReducer: security,
    popupReducer: popupMenager,
})
