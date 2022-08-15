import { STORE_TOKEN, DELETE_TOKEN, COMPLETE_REGISTRATION } from 'store/types'

export type AuthState = {
    token: string
    refreshToken: string
    kycStatus: boolean
    userName: string
    email: string
}

const authState: AuthState = {
    token: '',
    refreshToken: '',
    kycStatus: false,
    userName: '',
    email: '',
}

export default function authReducer(
    initialState: AuthState = authState,
    action: {
        type: string
        token?: string
        refreshToken?: string
        kycStatus?: boolean
        userName?: string
        email?: string
    }
): AuthState {
    switch (action.type) {
        case STORE_TOKEN:
            return {
                ...initialState,
                token: action.token,
                refreshToken: action.refreshToken,
                kycStatus: action.kycStatus,
                userName: action.userName,
                email: action.email,
            }
        case DELETE_TOKEN: {
            return authState
        }
        case COMPLETE_REGISTRATION:
            return {
                ...initialState,
                kycStatus: true,
                userName: action.userName,
            }
        default:
            return initialState
    }
}
