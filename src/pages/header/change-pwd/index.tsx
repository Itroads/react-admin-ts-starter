import * as React from 'react'
import MFooter from '../../../components/modal-footer/index'
import createToast from '../../../components/toast/index'
import intl from 'react-intl-universal';
import styles from './changePwd.less'

export default class ChangeModal extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      originalPwd: '',
      newPwd: '',
      newPwdAgain: ''
    }
  }


  public cbFuncToParent = () => {
    if(this.state.newPwd !== this.state.newPwdAgain) {
      createToast(intl.get('COM00200000010001').d('“新密码”与“确认密码”不一致'))
      return;
    }
    if(this.props.cbFnToParent) {
      this.props.cbFnToParent({
        type: 'not',
        oldpassword: window.btoa(this.state.originalPwd),
        newpassword: window.btoa(this.state.newPwd)
      })
      this.props.close()
    }
  }

  public handleChange = (e: any, type: string) => {
    this.setState({
      [type]: e.target.value
    });
  };

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.form}>
            <span>{intl.get('COM10100000040001').d('原密码')}</span>
            <input type="password" value={this.state.originalPwd} readOnly={true} onFocus={(e) => e.currentTarget.readOnly = false} onChange={(e) => this.handleChange(e, 'originalPwd')}/>
          </div>
          <div className={styles.form}>
            <span>{intl.get('COM10100000040002').d('新密码')}</span>
            <input type="password" value={this.state.newPwd} readOnly={true} onFocus={(e) => e.currentTarget.readOnly = false} onChange={(e) => this.handleChange(e, 'newPwd')}/>
          </div>
          <div className={styles.form}>
            <span>{intl.get('COM10100000040003').d('确认密码')}</span>
            <input type="password" value={this.state.newPwdAgain} readOnly={true} onFocus={(e) => e.currentTarget.readOnly = false} onChange={(e) => this.handleChange(e, 'newPwdAgain')}/>
          </div>
        </div>
        <MFooter btnYesFn={this.cbFuncToParent} closeFn={this.props.close}/>
      </div>
      
    )
  }
}