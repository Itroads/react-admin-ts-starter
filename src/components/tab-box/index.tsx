import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// import logoImg from '../../assets/logo.png'
import styles from './tabBox.less'

/**
 * 1，如何设置 默认页
 * 2，关闭一个 tab 页后，显示前面那个 tab 页，如何前面没有，显示后面那个 tab 页
 */

interface IProps {
  tabData: ITabItem[];
  activeTabId: string;
  deleteTab: (tabId: string) => void;
  toggleTab: (tabId: string) => void;
  defaultTab?: string;
}

class TabBox extends React.Component<IProps, any> {

  // public defaultProps: Partial<IProps> = {
  //   tabData: [],
  //   activeTabId: ''
  // };

  constructor(props: IProps) {
    super(props)
  }

  public handleDeleteTab(tabId: string, e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if(this.props.deleteTab) {
      this.props.deleteTab(tabId)
    }
  }

  public handleToggleTab(tabId: string) {
    if(this.props.toggleTab) {
      this.props.toggleTab(tabId)
    }
  }
    
  public render() {
    return (
      <div className={`${styles.container} sk-tabbox`}>
        {
          this.props.tabData.map(currentVal =>
            
            <div onClick={this.handleToggleTab.bind(this, currentVal.id)} 
              className={`${styles.tabItem} ${this.props.activeTabId === currentVal.id ? 'sk-tabbox-active' : ''} sk-tabbox-item`} 
              key={currentVal.id}
            >
              <div className={`${styles.tabContent} sk-tabbox-rb`}>
                <div className={styles.imgIcom}>
                  <img src={require('../../assets/logo.png')} alt=""/>
                </div>

                <span className={styles.tabName} title={currentVal.name}>
                  {currentVal.name}
                </span>

                {
                  this.props.defaultTab !== currentVal.id
                  ?
                  <div onClick={this.handleDeleteTab.bind(this, currentVal.id)} className={styles.icon}>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  : <div className={styles.icon}>{null}</div>
                }
                
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default TabBox
