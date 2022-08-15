import style from './index.module.css'
import { useEffect, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import translations from 'translations'
import Link from 'components/LinkWithLocalization'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { store } from 'store'
import { deleteToken } from 'store/actions/auth'
import LinkWithLocalization from 'components/LinkWithLocalization'
import Client from 'client'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { pushActionMessage } from 'store/actions/actionMessages'
import { pushPopup } from 'store/actions/popupMenager'
import { WALLET_INFO, WITHDRAW_POPUP } from 'store/types'

export default function NavBar() {
    const router: NextRouter = useRouter()
    const { locale, locales } = router
    const dictionary: { [key: string]: string } = translations[locale]
    const [active, setActive] = useState<boolean>(false)
    const [walletKey, setWalletKey] = useState<string>('')
    const authState = useSelector(
        (state: RootState) => state.sessionStorage.authReducer
    )
    const logedIn = authState.token.length !== 0
    const apiClient = Client.getInstance()
    useEffect(() => {
        setActive(false)
    }, [router])

    useEffect(() => {
        if (logedIn) {
            fetchKey()
        }
    }, [logedIn])

    function handleDeposit() {
        if (walletKey) {
            new RampInstantSDK({
                hostAppName: 'Lynx Digital',
                hostLogoUrl: process.env.logoUrl,
                // hostApiKey: process.env.rempApiKey,
                url: 'https://ri-widget-staging-kovan.firebaseapp.com/', // only specify the url if you want to use testnet widget versions,
                //url: 'https://ri-widget-staging-kovan.firebaseapp.com/', //kovan
                //url: 'https://ri-widget-staging.firebaseapp.com/', //Rinkeby
                //url: 'https://widget-instant.ramp.network/'
                variant: 'auto',
                userAddress: walletKey,
                swapAmount: '10000000000000000000',
                //swapAsset: 'DAI,ZKSYNC_DAI,MATIC_DAI',
            }).show()
        } else {
            store.dispatch(
                pushActionMessage(
                    'There was a problem fetching your wallet key please try again later!',
                    500
                )
            )
        }
    }

    function handleWidthdraw() {
        if (walletKey) {
            new RampInstantSDK({
                hostAppName: 'Lynx Digital',
                hostLogoUrl: process.env.logoUrl,
                hostApiKey: process.env.rempApiKey,
                variant: 'desktop',
                userAddress: walletKey,
                swapAsset: 'USDC',
                url: 'https://ri-widget-staging.firebaseapp.com/',
            }).show()
        } else {
            store.dispatch(
                pushActionMessage(
                    'There was a problem fetching your wallet key please try again later!',
                    500
                )
            )
        }
    }

    async function fetchKey() {
        const response = await apiClient.getWalletKey()
        setWalletKey(response.data)
    }

    return (
        <div className={`${style.container} ${active ? style.active : ''}`}>
            <Link href={logedIn ? '/dashboard' : '/'}>
                <span className={style.logoContainer}>
                    <svg className={style.logo} viewBox="0 0 291 80">
                        <g>
                            <path
                                d="M1.20185 0.380051C1.31201 0.630432 2.0331 2.24286 2.81428 3.96545L4.2264 7.09016L2.11322 16.0236C0.951469 20.931 3.56204e-05 25.0272 3.56204e-05 25.1073C-0.00997947 25.1974 2.09319 28.6927 4.67708 32.879C7.26097 37.0653 9.45428 40.6307 9.55443 40.8009L9.74472 41.1214L6.02912 43.8556C3.99606 45.3578 2.32354 46.6397 2.32354 46.6898C2.32354 47.0303 7.79177 69.4441 7.84185 69.3039C7.88191 69.2138 7.942 65.4581 7.98206 60.9713C8.02212 56.4846 8.08221 52.0779 8.12227 51.1966L8.18236 49.5742L11.287 47.1505C12.9996 45.8085 14.6421 44.5165 14.9626 44.2762L15.5234 43.8355L19.1689 45.3478C21.1619 46.1791 22.8344 46.8901 22.8745 46.9302C22.9146 46.9702 23.2451 49.3438 23.6156 52.2081C23.9762 55.0725 24.2866 57.426 24.2966 57.436C24.2966 57.436 26.3497 58.2673 28.8435 59.2588L33.3703 61.0715L37.9071 59.2588C40.3909 58.2673 42.444 57.436 42.444 57.436C42.454 57.426 42.7544 55.0725 43.125 52.2182C43.4855 49.3538 43.816 46.9803 43.8561 46.9402C43.9062 46.9001 45.5687 46.1791 47.5717 45.3478L51.2172 43.8355L51.6378 44.166C51.8682 44.3463 53.5307 45.6483 55.3234 47.0504L58.5783 49.5942L58.6384 52.5086C58.6784 54.101 58.7385 58.6378 58.7786 62.5738C58.8086 66.5798 58.8787 69.6244 58.9188 69.4842C59.0991 68.9534 64.4271 46.7299 64.397 46.6498C64.377 46.5997 62.7145 45.3378 60.6815 43.8455C58.6584 42.3433 57.0159 41.0914 57.036 41.0613C57.056 41.0213 59.2593 37.4359 61.9233 33.0893C64.5873 28.7428 66.7506 25.1173 66.7406 25.0272C66.7206 24.937 65.7591 20.8709 64.6074 15.9836L62.5042 7.10018L64.0766 3.61492C64.9379 1.69203 65.669 0.0795975 65.699 0.0295258C65.7992 -0.180794 65.2383 0.470184 56.1947 10.8458C51.117 16.6846 46.9207 21.4518 46.8706 21.4318C46.8206 21.4218 43.776 19.9495 40.1105 18.1568C36.4349 16.3641 33.4004 14.9019 33.3703 14.9019C33.3302 14.9019 30.2957 16.3641 26.6201 18.1568C22.9446 19.9495 19.9 21.4318 19.86 21.4418C19.8099 21.4518 15.6035 16.6646 10.4858 10.7957C5.37814 4.9269 1.15177 0.0795975 1.1017 0.0295258C1.05162 -0.0305634 1.09168 0.129677 1.20185 0.380051ZM11.3672 19.4688L14.7523 24.9471L14.2014 30.4053C13.891 33.4098 13.6206 35.8835 13.6005 35.9036C13.5805 35.9336 13.3602 35.6432 13.1198 35.2626C12.8694 34.892 11.1869 32.3082 9.37416 29.524C7.55141 26.7398 6.03913 24.4062 5.98906 24.3361C5.91895 24.216 7.83183 14.0006 7.93199 14.0006C7.96203 14.0006 9.50435 16.4643 11.3672 19.4688ZM59.8502 19.1884L60.8217 24.236L56.9859 30.1048L53.1501 35.9737L53.08 35.5831C53.0299 35.3628 52.7695 32.879 52.4891 30.0648L51.9783 24.9471L55.3634 19.4688C57.2262 16.4643 58.7786 14.0306 58.8186 14.0707C58.8487 14.1208 59.3194 16.4142 59.8502 19.1884ZM39.4395 24.2059C42.7444 25.7783 45.4585 27.0703 45.4785 27.0903C45.5386 27.1304 47.1811 37.4058 47.1911 37.7363C47.1911 37.9567 46.7505 38.2471 42.9848 40.4805C40.6713 41.8525 38.7785 42.9943 38.7785 43.0043C38.7785 43.0443 36.5852 53.2397 36.515 53.5301C36.475 53.6804 35.9742 54.0609 34.9627 54.7019C34.1415 55.2327 33.4204 55.6633 33.3603 55.6633C33.3102 55.6633 32.5891 55.2327 31.7579 54.7019C30.7564 54.0609 30.2456 53.6703 30.2156 53.5201C30.1855 53.4099 29.6647 50.9863 29.0538 48.152C28.4429 45.3178 27.9321 42.9842 27.9221 42.9742C27.9121 42.9642 26.0393 41.8425 23.7558 40.4905C21.4724 39.1284 19.5695 37.9867 19.5395 37.9567C19.5094 37.9166 19.87 35.4629 20.3407 32.4984L21.202 27.1103L27.2611 24.216C30.5961 22.6336 33.3503 21.3416 33.3803 21.3416C33.4204 21.3516 36.1445 22.6436 39.4395 24.2059Z"
                                fill="#28262C"
                            />
                            <path
                                d="M180.422 26.3592C180.021 26.4894 179.47 26.7398 179.19 26.92C178.569 27.3206 177.718 28.232 177.367 28.883C176.756 30.0147 176.786 29.0332 176.786 46.8701V63.1747H180.742H184.698L184.718 50.0048L184.748 36.835L201.123 50.0649C210.127 57.3359 217.708 63.405 217.968 63.5352C219.491 64.3164 221.454 64.1962 223.106 63.2347C223.787 62.8341 224.719 61.8326 225.059 61.1316C225.68 59.8697 225.66 60.6609 225.66 43.0143V26.92H221.704H217.748L217.728 40.0999L217.698 53.2898L201.233 40.0498C192.18 32.7689 184.608 26.7298 184.408 26.6296C183.296 26.0587 181.684 25.9486 180.422 26.3592Z"
                                fill="#28262C"
                            />
                            <path
                                d="M128.263 36.4243C135.244 43.4049 138.058 46.139 138.519 46.4394C139.24 46.9001 140.171 47.2206 141.023 47.3108C141.333 47.3408 141.734 47.3809 141.914 47.4109L142.234 47.461V55.3128V63.1747H146.24H150.246V55.3228V47.471L150.557 47.4109C150.727 47.3809 151.038 47.3508 151.248 47.3508C151.448 47.3508 151.969 47.2607 152.39 47.1505C154.032 46.7299 153.481 47.2206 164.167 36.5646L173.932 26.8199H168.364H162.795L156.426 33.1294L150.066 39.4389H146.27H142.485L136.175 33.1294L129.866 26.8199H124.257H118.649L128.263 36.4243Z"
                                fill="#28262C"
                            />
                            <path
                                d="M238.94 35.9536L248.104 45.0874L239.06 54.131L230.017 63.1747H235.575H241.133L248.194 56.114L255.255 49.0534H260.362H265.47L272.531 56.114L279.591 63.1747H285.15H290.708L281.664 54.131L272.621 45.0874L281.765 35.9536L290.908 26.8199H285.35H279.792L272.631 33.9807L265.47 41.1415H260.362H255.255L248.094 33.9807L240.933 26.8199H235.355H229.776L238.94 35.9536Z"
                                fill="#28262C"
                            />
                            <path
                                d="M89.6551 39.1585C89.6551 52.6187 89.6451 52.3483 90.266 54.2111C90.947 56.2642 91.9185 57.8266 93.4608 59.3689C94.9931 60.9112 96.6657 61.9428 98.6386 62.5737C100.592 63.2047 99.7803 63.1747 117.106 63.1747H132.92V59.2187V55.2627H117.677C107.492 55.2627 102.204 55.2227 101.773 55.1526C100.031 54.8721 98.4283 53.48 97.8274 51.7274C97.6171 51.1065 97.6171 51.0764 97.587 39.0082L97.557 26.92H93.6111H89.6551V39.1585Z"
                                fill="#28262C"
                            />
                            <path
                                d="M16.8053 58.6378C16.7753 58.7981 16.565 60.2603 16.3346 61.9128C15.934 64.8171 15.924 64.9073 16.1043 65.0775C16.2144 65.1677 17.2861 66.0991 18.4979 67.1406C19.7097 68.1722 23.5255 71.4972 26.9807 74.5117C30.4359 77.5263 33.3102 80 33.3603 80C33.4204 80 36.1445 77.6665 39.3994 74.8122C42.6643 71.9579 46.5301 68.6028 47.9923 67.3409C49.4545 66.089 50.6864 65.0074 50.7264 64.9473C50.7965 64.8472 49.9653 58.4976 49.8651 58.4075C49.8551 58.3874 48.3428 59.6794 46.5201 61.2818C44.6873 62.8742 43.155 64.1762 43.115 64.1762C43.0649 64.1762 41.9132 63.5853 40.5411 62.8742L38.0573 61.5622L35.7639 62.7741C34.502 63.435 33.4204 63.9759 33.3603 63.9759C33.3002 63.9759 32.2286 63.435 30.9667 62.7741L28.6832 61.5622L26.1694 62.8742C24.7874 63.6053 23.6156 64.1762 23.5655 64.1561C23.5154 64.1461 22.1133 62.9343 20.4508 61.4821C18.7883 60.0299 17.2961 58.728 17.1458 58.5978L16.8654 58.3674L16.8053 58.6378ZM36.0643 67.7616C37.5065 68.5227 38.6883 69.1937 38.6683 69.2438C38.6583 69.2939 37.4564 70.4757 36.0043 71.8678L33.3703 74.4016L30.7263 71.8678C29.2741 70.4757 28.0823 69.2839 28.0723 69.2338C28.0623 69.1436 33.0999 66.4095 33.3202 66.3895C33.3803 66.3795 34.6122 67.0004 36.0643 67.7616Z"
                                fill="#28262C"
                            />
                        </g>
                        <defs>
                            <clipPath>
                                <rect
                                    width="290.908"
                                    height="80"
                                    fill="white"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            </Link>
            <div
                className={`${style.itemWraper} ${active ? style.active : ''}`}
            >
                {logedIn ? (
                    <ul className={style.menuContainer}>
                        <li className={style.item}>
                            <Link href="/dashboard">
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        {authState.kycStatus ? (
                        <li className={style.item}>
                            <Link href="/deposit">
                                <>
                                    <span>Deposit</span>
                                    <ul className={style.dropDown}>
                                        <li
                                            className={style.element}
                                            onClick={() =>
                                                store.dispatch(
                                                    pushPopup(WALLET_INFO)
                                                )
                                            }
                                        >
                                            via Wallet
                                        </li>
                                        <li
                                            className={style.element}
                                            onClick={() => handleDeposit()}
                                        >
                                            via Bank
                                        </li>
                                    </ul>
                                </>
                            </Link>
                        </li>
                        ):(
                            <li className={style.item}>Deposit</li>
                        )}

                        {authState.kycStatus ? (
                        <li
                            className={style.item}
                            // onClick={() => handleWidthdraw()}
                            onClick={() =>
                                store.dispatch(
                                    pushPopup(WITHDRAW_POPUP)
                                )
                            }
                        >
                            <span>Withdraw</span>
                        </li>
                        ):(
                            <li className={style.item}>Deposit</li>
                        )}
                        
                        <li className={style.item}>
                            <Link href="/send">
                                <span>Send</span>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className={style.menuContainer}>
                        <li className={style.item}>
                            <Link href="/">
                                <span>{dictionary['home']}</span>
                            </Link>
                        </li>
                        <li className={style.item}>
                            <Link href="/blog">
                                <span>{dictionary['blog']}</span>
                            </Link>
                        </li>
                        <li className={style.item}>
                            <Link href="/about-us">
                                <span>{dictionary['about']}</span>
                            </Link>
                        </li>
                    </ul>
                )}
                <div className={style.userContainer}>
                    {logedIn ? (
                        <div>
                            {authState.kycStatus ? (
                                <div className={style.usernameContainer}>
                                    <svg
                                        className={style.icon}
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="var(--color-secondary)"
                                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                        />
                                    </svg>

                                    <span className={style.userName}>
                                        {authState.userName}
                                    </span>
                                    <div className={style.dropDown}>
                                        <Link href="/profile">
                                            <span
                                                className={style.dropDownItem}
                                            >
                                                Profile
                                            </span>
                                        </Link>
                                        <Link href="/change-password">
                                            <span
                                                className={style.dropDownItem}
                                            >
                                                Change password
                                            </span>
                                        </Link>
                                        <button
                                            className={style.dropDownItem}
                                            onClick={async () => {
                                                await router.push('/login')
                                                store.dispatch(deleteToken())
                                            }}
                                        >
                                            <svg viewBox="0 0 512 512">
                                                <path
                                                    fill="var(--color-secondary)"
                                                    d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <span
                                    className={style.item}
                                    onClick={async () => {
                                        await router.push('/login')
                                        store.dispatch(deleteToken())
                                    }}
                                >
                                    Logout
                                </span>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <span className={style.item}>
                                    {dictionary['login']}
                                </span>
                            </Link>
                            <Link href="/register">
                                <span className={style.register}>
                                    {dictionary['register']}
                                </span>
                            </Link>
                        </>
                    )}
                    <div className={style.languageWraper}>
                        <div className={style.iconContainer}>
                            <svg className={style.icon} viewBox="0 0 30 30">
                                <g>
                                    <path
                                        fill="var(--color-secondary)"
                                        d="M14.5312 0.46875C6.50391 0.46875 0 6.97266 0 15C0 23.0273 6.50391 29.5312 14.5312 29.5312C22.5586 29.5312 29.0625 23.0273 29.0625 15C29.0625 6.97266 22.5586 0.46875 14.5312 0.46875ZM26.25 15C26.25 16.3184 26.0215 17.5898 25.6172 18.7734H24.4277C24.1758 18.7734 23.9355 18.6738 23.7598 18.4922L21.8848 16.582C21.6211 16.3125 21.6211 15.873 21.8906 15.6035L22.623 14.8711V14.3613C22.623 14.1855 22.5527 14.0156 22.4297 13.8926L21.8789 13.3418C21.7559 13.2188 21.5859 13.1484 21.4102 13.1484H20.4727C20.1094 13.1484 19.8105 12.8496 19.8105 12.4863C19.8105 12.3105 19.8809 12.1406 20.0039 12.0176L20.5547 11.4668C20.6777 11.3438 20.8477 11.2734 21.0234 11.2734H22.8984C23.2617 11.2734 23.5605 10.9746 23.5605 10.6113V10.0605C23.5605 9.69727 23.2617 9.39844 22.8984 9.39844H20.748C20.2324 9.39844 19.8105 9.82031 19.8105 10.3359V10.5996C19.8105 11.0039 19.5527 11.3613 19.1719 11.4902L17.3203 12.1055C17.127 12.1699 16.998 12.3457 16.998 12.5508V12.6797C16.998 12.9375 16.7871 13.1484 16.5293 13.1484H15.5918C15.334 13.1484 15.123 12.9375 15.123 12.6797C15.123 12.4219 14.9121 12.2109 14.6543 12.2109H14.4727C14.2969 12.2109 14.1328 12.3105 14.0508 12.4688L13.5 13.5645C13.3418 13.8809 13.0195 14.0801 12.6621 14.0801H11.3672C10.8516 14.0801 10.4297 13.6582 10.4297 13.1426V11.6602C10.4297 11.4141 10.5293 11.1738 10.7051 10.998L11.8828 9.82031C12.1523 9.55078 12.3047 9.18164 12.3047 8.79492C12.3047 8.5957 12.4336 8.41406 12.627 8.34961L14.9707 7.57031C15.0703 7.53516 15.1582 7.48242 15.2285 7.41211L16.7988 5.8418C16.9219 5.71875 16.9922 5.54883 16.9922 5.37305C16.9922 5.00977 16.6934 4.71094 16.3301 4.71094H15.1172L14.1797 5.64844V6.11719C14.1797 6.375 13.9688 6.58594 13.7109 6.58594H12.7734C12.5156 6.58594 12.3047 6.375 12.3047 6.11719V4.94531C12.3047 4.79883 12.375 4.6582 12.4922 4.57031L14.1855 3.29883C14.2969 3.29297 14.4082 3.28125 14.5195 3.28125C20.9941 3.28125 26.25 8.53711 26.25 15ZM7.62305 8.73633C7.62305 8.56055 7.69336 8.39063 7.81641 8.26758L9.30469 6.7793C9.42773 6.65625 9.59766 6.58594 9.77344 6.58594C10.1367 6.58594 10.4355 6.88477 10.4355 7.24805V8.18555C10.4355 8.36133 10.3652 8.53125 10.2422 8.6543L9.69141 9.20508C9.56836 9.32812 9.39844 9.39844 9.22266 9.39844H8.28516C7.92187 9.39844 7.62305 9.09961 7.62305 8.73633ZM15.123 26.6895V26.2734C15.123 25.7578 14.7012 25.3359 14.1855 25.3359H13.002C12.3691 25.3359 11.4375 25.0254 10.9277 24.6445L9.62695 23.666C8.95312 23.1621 8.56055 22.3711 8.56055 21.5332V20.1328C8.56055 19.1953 9.05273 18.3281 9.85547 17.8477L12.3691 16.3418C12.7852 16.0957 13.2598 15.9609 13.7402 15.9609H15.5684C16.207 15.9609 16.8223 16.1895 17.3027 16.5996L19.834 18.7734H20.9062C21.4043 18.7734 21.8789 18.9727 22.2305 19.3242L23.2441 20.3379C23.4434 20.5371 23.7188 20.6484 24 20.6484H24.7852C22.8867 24.0996 19.2891 26.4785 15.123 26.6895Z"
                                    />
                                </g>
                                <defs>
                                    <clipPath>
                                        <rect
                                            width="29.0625"
                                            height="30"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={style.languageContainer}>
                            <p className={style.activeLanguage}>
                                {locale.substr(0, 2).toLocaleUpperCase()}
                            </p>
                            <div className={style.otherLanguages}>
                                {locales.map((currentLocale) => {
                                    return (
                                        <p
                                            className={style.language}
                                            key={currentLocale}
                                            onClick={(event) => {
                                                router.push('/', '/', {
                                                    locale: currentLocale,
                                                })
                                            }}
                                        >
                                            {currentLocale
                                                .substr(0, 2)
                                                .toLocaleUpperCase()}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${style.menuIcon} ${active ? style.active : ''}`}
                onClick={() => setActive(!active)}
            >
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}
