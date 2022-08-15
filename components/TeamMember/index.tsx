import style from './index.module.css'

export default function TeamMember(props) {
    return (
        <div className={style.container}>
            <img
                className={style.avatarImage}
                src={props.avatar || '/images/AvatarDefault.png'}
                alt="Member avatar"
            />
            <h3 className={style.name}>John Williams</h3>
            <h4 className={style.position}>NASDAQ</h4>
            <h5 className={style.quote}>
                Lorem Ipsum is simply dummy text of the printing
            </h5>
            <a className={style.linkedInWraper} href="/">
                <img
                    className={style.linkedInIcon}
                    src="/svgs/LinkedIn.svg"
                    alt="Linked In logo"
                />
            </a>
        </div>
    )
}
