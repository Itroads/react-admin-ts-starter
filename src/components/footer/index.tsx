import * as React from 'react'
import styles from './footer.less'

interface IProps {
  fullName: string;
  account?: string;
}

class Footer extends React.Component<IProps, any> {
  public render() {
    return (
        <footer className={`${styles.footer} sk-index-footer`}>
          <span>
          {this.props.fullName}

          {
            this.props.account
            ?
            `( ${this.props.account} )`
            : null
          }
          
          </span>
          <span>Copyright © Itroad 2016 - 2019 All right reserved.</span>
          <span>Ver. 2.3.0</span>
        </footer>
        
    )
  }
}

export default Footer
