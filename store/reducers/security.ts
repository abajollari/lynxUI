import { PUBLIC, SET_SECURITY } from 'store/types'

export type SecurityState = {
    security: string
}

const securityState: SecurityState = {
    security: PUBLIC,
}

export default function securityReducer(
    initialState: SecurityState = securityState,
    action: {
        type: string
        value?: string
    }
): SecurityState {
    switch (action.type) {
        case SET_SECURITY:
            return {
                ...initialState,
                security: action.value,
            }
        default:
            return initialState
    }
}
