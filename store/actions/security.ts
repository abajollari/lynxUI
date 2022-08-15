import { SET_SECURITY } from 'store/types'

export const setSecurity = (value: string) => {
    return {
        type: SET_SECURITY,
        value,
    }
}
