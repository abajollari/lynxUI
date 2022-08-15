import style from './index.module.css'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'
import ActionMessages from 'components/ActionMessages'
import PopupMenager from 'components/PopupMenager'

type SiteLayoutProps = {
    children: JSX.Element[] | JSX.Element
}

export default function SiteLayout(props: SiteLayoutProps) {
    return (
        <div className={style.container}>
            <NavBar />
            <PopupMenager />
            <ActionMessages />
            {props.children}
            <Footer />
        </div>
    )
}
