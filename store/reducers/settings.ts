import { REMEMBRE_ME } from 'store/types'

export type SettingsState = {
    rememberMe: { email: string; value: boolean }
}

const settingsState: SettingsState = {
    rememberMe: { email: '', value: false },
}

export default function settingsReducer(
    initialState: SettingsState = settingsState,
    action: {
        type: string
        email?: string
        value?: boolean
    }
): SettingsState {
    switch (action.type) {
        case REMEMBRE_ME:
            return {
                ...initialState,
                rememberMe: {
                    email: action.email,
                    value: action.value,
                },
            }
        default:
            return initialState
    }
}
