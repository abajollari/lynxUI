import style from 'styles/AboutUs.module.css'
import TeamMember from 'components/TeamMember'
import WaveAnimation from 'components/WaveAnimation'

export default function AboutUs() {
    return (
        <div className={style.container}>
            <WaveAnimation />
            <div className={style.imageContainer}>
                <img
                    className={style.heroImage}
                    src="/svgs/AboutUs.svg"
                    alt="About us image"
                />
            </div>
            <div className={style.content}>
                <h1 className={style.title}>About Lynx</h1>
                <p className={style.paragraph}>
                    Banking today is a painful experience riddled with anxiety
                    and low returns. We believe that managing money should not
                    be an uphill battle, but a simple and autonomous experience
                    that makes financial freedom accessible to all.
                </p>
                <p className={style.paragraph}>
                    Lynx is a cross-border digital banking platform that
                    provides people with an easy way to manage and grow their
                    idle money. Lynx is a simple app that lets you earn up to 5%
                    on your savings the rest of the time and send money to your
                    friends, all from the same place.
                </p>
            </div>
            <div className={style.content}>
                <h1 className={style.title}>Our Mission</h1>
                <p className={style.paragraph}>
                    Financial infrastructure and business models haven’t changed
                    meaningfully since the 1970s — and it’s time for a fresh
                    start.
                </p>
                <p className={style.paragraph}>
                    We have a new model – one where we don’t skim from you.Lynx
                    is a bridge from traditional finance to decentralized
                    finance which provides efficiency and simplification. Using
                    the power of blockchain technology, we will eliminate the
                    middleman and expensive old rails of the banking system
                    which leads to higher returns for our customers. We make
                    banking simple, yet beautiful.
                </p>
            </div>
            <div className={style.mockupContainer}>
                <img
                    className={style.mockupImage}
                    src="/images/IphoneMockup.png"
                    alt="Iphone mockup"
                />
            </div>
            {/* <div className={style.teamContainer}>
        <h2 className={style.teamTitle}>The Founders:</h2>
        <div className={style.membersContainer}>
          <TeamMember />
          <TeamMember />
          <TeamMember />
        </div>
      </div> */}
        </div>
    )
}
