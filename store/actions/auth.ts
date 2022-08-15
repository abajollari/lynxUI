import { STORE_TOKEN, DELETE_TOKEN, COMPLETE_REGISTRATION } from 'store/types'

export const storeToken = (
    token: string,
    refreshToken: string,
    kycStatus: boolean,
    userName: string,
    email: string
) => {
    return {
        type: STORE_TOKEN,
        token,
        refreshToken,
        kycStatus,
        userName,
        email,
    }
}

export const deleteToken = () => {
    return {
        type: DELETE_TOKEN,
    }
}

export const completeRegistration = (userName: string) => {
    return {
        type: COMPLETE_REGISTRATION,
        userName,
    }
}
