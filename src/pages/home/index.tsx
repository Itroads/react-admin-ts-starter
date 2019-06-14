import * as React from 'react'
import { connect } from 'react-redux'
import { addTabBox, setDefaultTab } from '../../reducers/tabBoxReducer'

import styles from '../../App.less';
import Header from '../header/index'
import Footer from '../../components/footer/index'
import Menu from '../../components/menu'
import MenuTitle from '../../components/menu-title/index'
import MenuTitleImg from '../../assets/logo.png'

import PageBox from './pageBox'

import { getLeftMenu } from '../../http/api/index'


interface IProps {
  routeMap: any;
  addTabBox: (tabItem: ITabItem) => void;
  setDefaultTab: (tabItem: ITabItem) => void;
  history: any;
  activeTabId: string;
}

interface IState {
  data: any;
  empBasic: any;
}

class Home extends React.PureComponent<IProps, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      data: null,
      empBasic: null,
    }
  }

  public componentDidMount () {
    getLeftMenu().then((res: any) => {
      if(res && res.result) {
        this.setState({
          data: res.data
        })
      }
    })

    // 设置默认页
    // 可以在登录时存入本地，然后每次读取本地。通过数据库更改默认页后，重新登录，修改本地数据即可
    this.props.setDefaultTab({
      id: '1021110110100000000',
      name: '角色管理',
      tabIcon: 'logo.png',
    })

    // footer 获取真实登录信息
    const empBasic = JSON.parse(window.sessionStorage.getItem('empBasic'))
    this.setState({
      empBasic
    })

  }

  public render() {
    return (
      <div className={`${styles.container} sk-index`}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.layout} style={{height: 'calc(100% - 80px)'}}>
          <div className={styles.menu + ' sk-index-left'}>
            <MenuTitle src={MenuTitleImg} text='功能导航' />
            <div className={styles.containMenu}>
              <Menu data={this.state.data} activeTabId={this.props.activeTabId} openOrToggleTabBox={this.props.addTabBox}/>
            </div>
          </div>
          <div className={styles.content}>
            <PageBox />
          </div>
        </div>
        <div className={styles.footer}>
          <Footer fullName={this.state.empBasic ? this.state.empBasic.full_name : ''} account={this.state.empBasic ? this.state.empBasic.account : ''} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  activeTabId: state.tabBoxState.activeTabId
})

const mapDispatchToProps = (dispatch: any) => ({
  addTabBox: (tabItem: ITabItem) => dispatch(addTabBox(tabItem)),
  setDefaultTab: (tabItem: ITabItem) => dispatch(setDefaultTab(tabItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home) as any
