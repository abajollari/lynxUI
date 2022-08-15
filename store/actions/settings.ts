import { REMEMBRE_ME } from 'store/types'

export const rememberMe = (email: string, value: boolean) => {
    return {
        type: REMEMBRE_ME,
        email,
        value,
    }
}
