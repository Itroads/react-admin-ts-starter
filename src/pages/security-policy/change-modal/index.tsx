import * as React from 'react'
import intl from 'react-intl-universal'

import MFooter from '../../../components/modal-footer/index'
import styles from './changeModal.less'

export default class ChangeModal extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      value: props.dataFromParent.type === 1 ? props.dataFromParent.value === intl.get('COM001005002V1').d('开启') ? '1' : '0'   : props.dataFromParent.value,
      type: props.dataFromParent.type
    }
  }


  public cbFuncToParent = () => {
    if(this.props.cbFnToParent) {
      this.props.cbFnToParent(this.state.value)
      this.props.close()
    }
  }

  public handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    });
  };

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.body}>
        <div className={styles.txt}>{this.props.dataFromParent.txt}</div>
        {
          this.state.type === 1
          ?
          <select
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="1">{intl.get('COM001005002V1').d('开启')}</option>
            <option value="0">{intl.get('COM001005002V0').d('关闭')}</option>
          </select>
          :
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        }
          
        </div>
        <MFooter btnYesFn={this.cbFuncToParent} closeFn={this.props.close}/>
      </div>
      
    )
  }
}