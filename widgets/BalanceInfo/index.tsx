import style from './index.module.css'
import { store } from 'store'
import { pushPopup } from 'store/actions/popupMenager'
import { WALLET_INFO } from 'store/types'
import Link from 'components/LinkWithLocalization'

type props = {
      userBalance: string
}

export default function BalanceInfo(props: props) {
    return (
        <form
            className={style.container}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                store.dispatch(pushPopup(WALLET_INFO))
            }}
        >
<       div className={style.container}>
      <div className={style.subSection}>

      <div>
      <h3 className={style.title}>Balance</h3>
      <div className={style.iconSection}> 
        <div>
          <h4 className={style.balance}>$ {props.userBalance}</h4>
        </div>
      </div>
      </div>

      <div>
      <h3 className={style.title}>Interest Rate</h3>
      <div className={style.iconSection}> 
        <div>
          <h4 className={style.balance}>5.25% <span className={style.note}>&nbsp; *Rates may vary</span></h4>
        </div>
      </div>
      </div>

      <div>
      <h3 className={style.title}>Interest Paid</h3>
      <div className={style.iconSection}> 
        <div>
          <h4 className={style.balance}>$ 0.00</h4>
        </div>
      </div>
      </div>

      </div>
    </div>
        </form>
    )
}
