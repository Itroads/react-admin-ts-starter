import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginOn } from '../../http/api/index'
import { setLoginStatus } from '../../reducers/loginStateReducer'
import { createLoading, clearLoading } from '../../components/loading/index'

import style from './index.less'

interface ILoginProps {
  history: any;
  location: any;
  status: boolean;
  setLoginStatus: (status: boolean) => {type: string, status: boolean};
}

class Login extends React.PureComponent<ILoginProps, any> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  /**
   * 获取表单数据，并存储到 state 中
   * @param {string} key 标志，输入框中的值，对应 state 中的哪个 key 的值，方便做 setState 赋值
   * @param {object} e 通过 e.target.value 获取输入的值，配合参数 key 和 setState 完成输入内容的存储
   */
  public handleChange = (key: string, e: any): void => {
    const stateObj = {}
    stateObj[key] = e.target.value
    this.setState(stateObj)
  }

  public handleLogin = (): void => {
    const pwdBase64 = window.btoa(this.state.password)
    const loadDom = createLoading();
    LoginOn({
      account: this.state.username,
      password: pwdBase64
    }).then((res: any) => {
      if (res && res.result) {

        clearLoading(loadDom)

        window.sessionStorage.setItem('empBasic',JSON.stringify(res.data))
        
        this.props.setLoginStatus(res.result)

        this.props.history.push('/');
      } else {
        clearLoading(loadDom)
      }
    })
  }

  public handleEnterKey = (e: any) => {
    if(e.nativeEvent.keyCode === 13){
         this.handleLogin()
    }
  }

  public render() {
    return (
      <div className={style.container}>
        <div className={style.title}>
          <img src={require('../../assets/logo.png')} className={style.img} alt="emp-logo" />
          <h1>Enterprise Management Portal</h1>
        </div>
        <div className={style.loginForm}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} />
              <input type="text" className={style.loginInput} onChange={this.handleChange.bind(this, 'username')} />
            </li>
            <li>
              <FontAwesomeIcon icon={faLock} />
              <input type="password" className={style.loginInput} onChange={this.handleChange.bind(this, 'password')} onKeyPress={this.handleEnterKey}/>
            </li>
            <li>
              <span onClick={this.handleLogin}>
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  status: state.loginState.status
})

const mapDispatchToProps = (dispatch: any) => ({
  setLoginStatus: (status: boolean) => dispatch(setLoginStatus(status))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login) as any)