import * as React from 'react'
import { connect } from 'react-redux'
import { deleteTabBox, toggleTabBox } from '../../reducers/tabBoxReducer'

import MenuTitle from '../../components/menu-title/index'
import TabBox from '../tab-box/index'

import MenuTitleImg from '../../assets/logo.png'
import styles from './layout.less'

interface IProps {
  isShow: boolean; // 是否显示该组件
  tabBoxState: IDefaultState;
  deleteTabBox: (id: string) => void;
  toggleTabBox: (id: string) => void;
}


class Layout extends React.Component<IProps, any> {
  public componentDidMount(){
    // console.log(this.props)
  }
  public render() {
    return (
      <div className={styles.container} style={{display:this.props.isShow ? "flex" : "none"}}>
        <div className={styles.content+ ' sk-index-content'}>
          <div className={styles.tabBox}>
            <TabBox 
              tabData={this.props.tabBoxState.tabData}
              activeTabId={this.props.tabBoxState.activeTabId}
              deleteTab={this.props.deleteTabBox}
              toggleTab={this.props.toggleTabBox}
              defaultTab={'1021110110100000000'}
            />
          </div>
          <div className={styles.contentBox}>
            {Array.isArray(this.props.children) ? this.props.children[0] : this.props.children}
          </div>
          
        </div>
        {
          this.props.children[1]
          ?
          <div className={styles.rightMenu + ' sk-index-right'}>
            <MenuTitle src={MenuTitleImg} text='操作菜单' />
            <div className={styles.containMenu}>
              {this.props.children[1]}
            </div>
          </div>
          : null
        }
        
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({
  tabBoxState: state.tabBoxState
})

const mapDispatchToProps = (dispatch: any) => ({
  deleteTabBox: (tabId: string) => dispatch(deleteTabBox(tabId)),
  toggleTabBox: (tabId: string) => dispatch(toggleTabBox(tabId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout) as any
