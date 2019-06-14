import * as React from 'react'
import styles from './menuTitle.less'

interface IProps {
  src: string;
  text: string;
}

export default class OrganizationUsers extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className={`${styles.head} sk-menu-title`}>
        <img src={this.props.src} alt="logo"/>
        <span>{this.props.text}</span>
      </div>
    )
  }
}