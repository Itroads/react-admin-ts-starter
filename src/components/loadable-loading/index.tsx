import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import style from './loading.less'

const LoadingComponent = (props: any) => {
  if (props.error) {
    return (
      <div className={style.toast}>
        <div><FontAwesomeIcon icon={faExclamationTriangle} /> Error! Try again.</div>
      </div>
    )
  } else if (props.pastDelay) {
    // 300ms 之后显示
    return (
      <div className={style.toast}>
        <div>
          <span className={style.circle}>
            <FontAwesomeIcon icon={faCircleNotch} />
          </span>
          Loading...
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default LoadingComponent
