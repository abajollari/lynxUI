import Link from 'components/LinkWithLocalization'
import WaveAnimation from 'components/WaveAnimation'
import { useEffect } from 'react'
import { store } from 'store'
import { setSecurity } from 'store/actions/security'
import { PUBLIC } from 'store/types'

import style from 'styles/Home.module.css'

export default function Home() {
    useEffect(() => {
        store.dispatch(setSecurity(PUBLIC))
    }, [])
    return (
        <div className={style.container}>
            <WaveAnimation />
            <div className={style.section1}>
                <h1 className={style.title}>Better Than Your Bank</h1>
                <ul className={`${style.listContainer} ${style.listPoint}`}>
                    <li>
                        <h3>
                            Earn Up To 5% Interest With a Digital Dollar Savings
                            Account
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Deposit and Withdraw Your Money - Anytime, Anywhere
                        </h3>
                    </li>
                    <li>
                        <h3>Interest Is Earned and Compounded Daily</h3>
                    </li>
                    <li>
                        <h3>Send Money to Friends and Family Instantly</h3>
                    </li>
                    <li>
                        <h3>No Minimum Balance, No Hidden Fees</h3>
                    </li>
                </ul>
                <Link href="/register">
                    <span className={style.blueButton}>Start saving now</span>
                </Link>
            </div>
            <div className={style.section2}>
                <img src="/svgs/MoneyTransfer.svg" alt="Money Transfer" />
            </div>
            <div className={style.section3}>
                <img src="/svgs/Motivation.svg" alt="Motivation" />
            </div>
            <div className={style.section4}>
                <h2 className={style.sectionTitle}>
                    Invest In Decentralized Finance
                </h2>
                <ul className={style.listContainer}>
                    <li>
                        <h3>
                            Be Part Of a New Global Economy By Investing In
                            Decentralized Finance
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Buy Tokenized Stocks Of Companies Such As Tesla,
                            Amazon, Facebook, Microsoft and more
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Buy, Save & Manage Your Digital Assets In One Place
                        </h3>
                    </li>
                </ul>
            </div>
            <div className={style.section5}>
                <h2 className={style.sectionTitle}>
                    Lynx Helps You Save Money In 3 Easy Steps:
                </h2>
                <ul className={style.listContainer}>
                    <li>
                        <h3>
                            1. Sign Up - Sign up for your free Lynx Account on
                            Web, iOS or Android
                        </h3>
                    </li>
                    <li>
                        <h3>
                            2. Deposit Money - Connect your bank account and
                            choose your preferred payment method of transfer
                        </h3>
                    </li>
                    <li>
                        <h3>
                            3. Start Saving - Your local currency will
                            automatically convert to Digital US Dollar (USDC)
                            and start earning high interest
                        </h3>
                    </li>
                </ul>
                {/* <div className={style.buttonWraper}>
          <Link href="/">
            <span className={style.orangeButton}>Learn More</span>
          </Link>
          <span className={style.info}>
            Click here to learn more about tokenized stocks
          </span>
        </div> */}
            </div>
            <div className={style.section6}>
                <img src="/svgs/Revenue.svg" alt="Revenue" />
            </div>
        </div>
    )
}
