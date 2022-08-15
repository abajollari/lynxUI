import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { KycFromat } from 'classes/kyc'
import User from 'classes/user'
import { store } from 'store'
import { pushActionMessage } from 'store/actions/actionMessages'
import { storeToken, deleteToken } from 'store/actions/auth'

const BASE_URL = 'https://lynxdigitalauth.azurewebsites.net/' 
//const BASE_URL = "http://localhost:3001";
axios.defaults.timeout = 50000; //Arian changed from 5000

export default class Client {
    private api: AxiosInstance
    private static instance: Client

    private async refresh() {
        try {
            const response: AxiosResponse = await axios.post(
                `${BASE_URL}/auth/refreshToken`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${
                            store.getState().sessionStorage.authReducer
                                .refreshToken
                        }`,
                    },
                }
            )
            store.dispatch(
                storeToken(
                    response.data.token,
                    response.data.refreshToken,
                    store.getState().sessionStorage.authReducer.kycStatus,
                    store.getState().sessionStorage.authReducer.userName,
                    store.getState().sessionStorage.authReducer.email
                )
            )
            return response
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    store.dispatch(deleteToken())
                    store.dispatch(
                        pushActionMessage(
                            'Your session has expired!',
                            error.response.status
                        )
                    )
                    break
                case 404:
                    store.dispatch(deleteToken())
                    store.dispatch(
                        pushActionMessage(
                            'There is a problem with your internet connection!',
                            error.response.status
                        )
                    )
                    throw error
                    break
                case 500:
                    store.dispatch(deleteToken())
                    store.dispatch(
                        pushActionMessage(
                            'Oops something went wrong!',
                            error.response.status
                        )
                    )
                    throw error
                    break
            }
        }
    }

    static getInstance() {
        if (!Client.instance) {
            Client.instance = new Client()
        }
        return Client.instance
    }

    constructor() {
        if (Client.instance) {
            throw Error('Client instance already exists')
        }
        this.api = axios.create({
            baseURL: BASE_URL,
            timeout: 50000, //ARIAN default is 5000
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.api.interceptors.request.use((request) => {
            request.headers.Authorization = `Bearer ${
                store.getState().sessionStorage.authReducer.token
            }`
            return request
        })
        this.api.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                console.log(error)
                //alert(error)
                const request = error.config
                if(error.response !== undefined) { //ARIAN
                    if (error.response.status === 401) {
                        let response
                        try {
                            response = await this.refresh()
                            //console.log(response)
                            request.headers.Authorization = `Bearer ${response.data.token}`
                            const newRequset = axios(request)
                            return newRequset
                        } catch (refreshError) {
                            return Promise.reject(refreshError)
                        }
                    }
                }
                return Promise.reject(error)
            }
        )
    }

    registerUser(user: User) {
        return this.api.post('/auth/signup', user.getRequestData())
    }

    loginUser(user: User) {
        return this.api.post('/auth/signin', user.getRequestData())
    }

    sendResetPasswordEmail(email: string) {
        return this.api.post('/auth/forgotPassword', { email })
    }

    resetPassword(token: string | string[], password: string) {
        return this.api.post(`/auth/resetPassword/${token}`, { password })
    }

    verifyEmail(email: string | string[], token: string | string[]) {
        return this.api.get(`/auth/verification/${email}/${token}`)
    }

    resendEmailVerification(email: string | string[]) {
        return this.api.get(`/auth/resendEmail/${email}`)
    }

    sendKycData(data: KycFromat) {
        return this.api.post('/auth/completeProfile', data)
    }

    getWalletKey() {
        return this.api.get('auth/wallet/publicKey')
    }

    getProfileInfo(email: string) {
        return this.api.get(`auth/getProfileInfo/${email}`)
    }

    changePassword(password: string) {
        return this.api.post(`auth/changePassword`, { password })
    }

    send(from: string, amount: number, to: string) {
        return this.api.post(`auth/transfer`, { from, to, amount })
    }

    getUserTransactions(addr: string) {
        return this.api.get(`auth/usertransaction/${addr}`)
    }
    
    getUserBalance() {
        return this.api.get(`auth/userbalance`)
    }

    doDeposit(amount: number) {
        return this.api.post(`auth/userdeposit`, { amount })
    }

    doWithdraw(amount: number) {
        return this.api.post(`auth/userwithdraw`, { amount })
    }

    //user wallet eth balance
    getUserEthBalance(addr: string) {
        return this.api.get(`auth/userEthBalance/${addr}`)
    }

    //user wallet token balance
    getUserTokenBalance(addr: string) {
        return this.api.get(`auth/userTokenBalance/${addr}`)
    }
}
