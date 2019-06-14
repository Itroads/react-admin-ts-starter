import * as React from 'react'
import intl from 'react-intl-universal'
import styles from './modalFooter.less'

interface IProps {
  btnYesFn: any;
  closeFn: any;
}

class ModalFooter extends React.Component<IProps, any> {
  public render() {
    return (
      <div className={`${styles.footer} sk-modal-footer`}>
        <button onClick={this.props.btnYesFn}>{intl.get('COM00100000010001').d("确定")}</button>
        <button onClick={this.props.closeFn}>{intl.get('COM00100000010003').d("取消")}</button>
      </div>
    )
  }
}

export default ModalFooter