import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import localStorageType from 'redux-persist/lib/storage'
import sessionStorageType from 'redux-persist/lib/storage/session'
import { localStorageReducer, sessionStorageReducer } from 'store/reducers'
import { combineReducers } from 'redux'

const localStoragePresistConfig = {
    key: 'localStorage',
    blacklist: [],
    storage: localStorageType,
}

const sessionStoragePresistConfig = {
    key: 'sessionStorage',
    blacklist: [],
    storage: sessionStorageType,
}

const localStorage = persistReducer(
    localStoragePresistConfig,
    localStorageReducer
)

const sessionStorage = persistReducer(
    sessionStoragePresistConfig,
    sessionStorageReducer
)

const rootReducer = combineReducers({
    localStorage,
    sessionStorage: sessionStorage,
})

export const store = createStore(rootReducer)

export const persistor = persistStore(store)
