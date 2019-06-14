import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import intl from 'react-intl-universal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTshirt } from '@fortawesome/free-solid-svg-icons'

import { setLanguage } from '../../reducers/langsReducer'
import { setSkinStyle, skin } from '../../utils/skin'
import createModal from '../../components/modal/index'
import ChangePwd from './change-pwd/index'
import { changePassword, changeLanguage } from '../../http/api/index'
import { createWarning } from '../../components/alert/index'
import EmpMap from './emp-map/index'

import logoImg from './icon/logo.png'
import styles from './header.less'

interface IChangePwd {
  type: string,
  oldpassword: string,
  newpassword: string
}

class Header extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      tabIndex: 0,
      lang: window.localStorage.getItem('empBasicLang') ? window.localStorage.getItem('empBasicLang') : '',
      skinType: window.localStorage.getItem('empBasicSkin') ? window.localStorage.getItem('empBasicSkin') : 'darkBlue'
    }
  }

  public componentDidMount () {
    const localSkin = window.localStorage.getItem('empBasicSkin')
    const skintype = localSkin ? localSkin : 'darkBlue'
    setSkinStyle(skin[skintype])
  }

  public handleChangeSkin = (skintype: string) => {
    setSkinStyle(skin[skintype])
    window.localStorage.setItem('empBasicSkin', skintype)
    this.setState({
      skinType: skintype
    })
  }

  public handleGoHome = () => {
    this.props.history.push('/')
  }

  public handleChangePwd = () => {
    createModal(ChangePwd, {
      width: '500px',
      height: '300px',
      imgSrc: require('./icon/logo.png'),
      title: '参数修改'
    },(val: IChangePwd): void => {
      this.changePwdRest(val)
      return;
    }, null)
  }

  public changePwdRest = (params: IChangePwd) => {
    changePassword(params).then((res: any) => {
      if(res && res.result) {
        this.handleGoLogin()
      } else {
        createWarning(res.msg)
      }
    })
  }

  /**
   * 不是单纯的返回登录页
   * 要删除相关的身份信息，如：本地存储的token
   */
  public handleGoLogin = ():void => {
    window.sessionStorage.removeItem('empBasic')
    this.props.history.push('/login')
  }

  public handleChangeLangs = (e: any) => {
    window.localStorage.setItem('empBasicLang', e.target.value)
    this.setState({
      lang: e.target.value
    })
    let langCode = ''
    switch(e.target.value) {
      case 'zh-CN':
        langCode = '2052';
        break; 
      case 'en-US':
        langCode = '1033';
        break 
      case 'zh-HK':
        langCode = '1028';
        break 
    }
    changeLanguage({
      lang_id: langCode
    }).then((res: any) => {
      if(res && res.result) {
        window.location.reload()
      } else {
        createWarning(res.msg)
      }
    })
    
  }

  public showEmpMap = () => {
    createModal(EmpMap, {
      width: '500px',
      height: '300px',
      imgSrc: require('./icon/logo.png'),
      title: 'eMP世界地图'
    }, null, null)
  }

  public render() {
    return (
      <header className={`${styles.header} sk-index-header`}>
        <div className={styles.logo}>
          <div className={styles.ikbms} onClick={this.handleGoHome}>
            <span onClick={this.showEmpMap}><img src={logoImg} alt="eMP logo" /></span>
            <span>React Admin Scaffold</span>
          </div>
        </div>

        <div className={styles.operation}>
          <div className={styles.iconOpera}>

            <span className={`${styles.set}`}>

              <select value={this.state.lang} onChange={this.handleChangeLangs}>
                <option value="zh-CN">简体中文</option>
                {/* <option value="en-US">English</option>
                <option value="zh-HK">繁体中文</option> */}
              </select>
            </span>

            <span className={styles.set} style={{width: '24px'}}>
              <FontAwesomeIcon icon={faTshirt} />
              <ul className={styles.settingBtn}>
                <li>
                  <div className={styles.icon} style={{ backgroundColor: 'blue' }} />
                  <div className={`${styles.font} ${this.state.skinType === 'lightBlue' ? styles.skinActive : ''}`} onClick={() => this.handleChangeSkin('lightBlue')}>LightBlue</div>
                </li>
                <li>
                  <div className={styles.icon} style={{ backgroundColor: '#2c3e50' }} />
                  <div className={`${styles.font} ${this.state.skinType === 'darkBlue' ? styles.skinActive : ''}`} onClick={() => this.handleChangeSkin('darkBlue')}>DarkBlue</div>
                </li>
                <li>
                  <div className={styles.icon} style={{ backgroundColor: 'black' }} />
                  <div className={`${styles.font} ${this.state.skinType === 'darkBlack' ? styles.skinActive : ''}`} onClick={() => this.handleChangeSkin('darkBlack')}>DarkBlack</div>
                </li>
              </ul>
            </span>

            <span className={`${styles.set}`}>
              <FontAwesomeIcon icon={faUser} />
              <ul className={styles.settingBtn}>
                <li><div onClick={this.handleChangePwd}>{intl.get('FO1021110190101040000').d('修改密码')}</div></li>
                <li><div onClick={this.handleGoLogin}>{intl.get('FO1021110190101090000').d('注销/退出')}</div></li>
              </ul>
            </span>

          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state: any) => ({
  langs: state.langsState.langs
})

const mapDispatchToProps = (dispatch: any) => ({
  setLanguage: (langs: string) => dispatch(setLanguage(langs))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header) as any)