import 'styles/globals.css'
import { AppProps } from 'next/app'
import SiteLayout from 'components/SiteLayout'
import { persistor, store } from 'store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Security from 'components/Security'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SiteLayout>
                    <Security>
                        <Component {...pageProps} />
                    </Security>
                </SiteLayout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
