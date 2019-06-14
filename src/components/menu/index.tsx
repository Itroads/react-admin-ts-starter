import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import styles from './menu.less'

export interface IMenuProps {
  data?: any;
  operateCallBack?: any; // 右侧操作菜单回调函数
  openOrToggleTabBox?: any; // 左侧菜单导航，处理 tabBox 方法，来自redux
  activeTabId?: string;
  tabModalCount?: number; // 当前 tab 页的弹窗数量
}

export interface IMenuState {
  isShow?: any;
  menuData: null;
}

class Menu extends React.Component<IMenuProps, IMenuState> {

  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      isShow: null,
      menuData: props.data
    }
  }

  /**
   * 生命周期钩子: 根据 props 的变化，更新 state
   * @param {object} nextProps 
   */
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.menuData === nextProps.data) {
      // 如果传入的 props 没有变化，则不需要改变
      // 如果不同，则在底部，更新 state 的数据 
      return null
    }

    const data = nextProps.data
    

    /**
     * 递归生成 isShow 对象，控制菜单的展开和收缩
     * @param {array | object} data 
     * @return {item+id: true, item2: false, ...}
     */
    function getIsShow(todata: any) {
      const isShow = {}
      function getIsShowState(itemdata: any) {
        if (itemdata instanceof Array) {
          for (const item of itemdata) {
            getIsShowState(item)
          }
        } else {
          isShow['item' + itemdata.id] = itemdata.show
          getIsShowState(itemdata.children)
        }
      }
      getIsShowState(todata)
      return isShow
    }

    return {
      isShow: data ? getIsShow(data) : null,
      menuData: nextProps.data
    }

  }

  /**
   * 通过 id 来查找 this.state.isShow 中的数据，从而控制菜单的显示状态
   * @param {number} id 菜单 id
   */
  private handleClickMenu(id: number | string) {
    const current = {
      ['item' + id]: !this.state.isShow['item' + id]
    }
    const copyState = this.state.isShow
    this.setState({
      isShow: Object.assign({}, ...copyState, current)
    })
  }


  /**
   * 如果是右侧操作菜单，就会调用这个方法。 operate 属性
   * @param value 操作名称
   */
  public handleDisposeOperate(value: string) {
    // undefined 和 等于 0 的时候，执行操作
    if(!this.props.tabModalCount || this.props.tabModalCount === 0) {
      if (this.props.operateCallBack) {
        this.props.operateCallBack(value)
      }
    }
  }

  /**
   * 通过传入 id, text 来改变 store 中的数据，更新 tabBox 组件的样式
   * @param id 页面 id
   * @param text 页面名称
   */
  public handleDisposeTabBox(tabItem: ITabItem, e: any) {
    e.stopPropagation();
    if (this.props.openOrToggleTabBox) {
      this.props.openOrToggleTabBox(tabItem)
    }
  }

  /**
   * 递归生成菜单的 DOM 结构
   * @param {array} data 菜单数据
   * @param {number} id 菜单id
   */
  private handleCreateMenu(data: any, id?: string | number) {
    const menuDom = [];

    if (data instanceof Array) {
      const list = []
      for (const item of data) {
        list.push(this.handleCreateMenu(item))
      }
      menuDom.push(
        <ul key={id ? 'ul-' + id : 'root'} className={styles.menuUl} style={{ display: id ? this.state.isShow['item' + id] ? 'block' : 'none' : 'block' }}>
          {list}
        </ul>
      )
    } else {
      const levelClass = data.level === 0 ? `${styles.levelTop} sk-menu-top` : `${styles.levelItem} sk-menu-item`
      const margLeft = ((data.level + 1) * 16) + 'px'

      menuDom.push(
        <li key={data.id} id={data.id}>
          {
            data.children.length > 0
              ?
              <div onClick={this.handleClickMenu.bind(this, data.id)} className={levelClass} style={{ 'paddingLeft': margLeft }}>
                <div>
                  {
                    data.level === 0
                      ? <i className={styles.icon} style={{backgroundImage: 'url(./icon/' + data.icon + ')'}} />
                      : ''
                  }
                  <span>{data.name}</span>
                </div>
                {
                  this.state.isShow['item' + data.id]
                    ? <FontAwesomeIcon icon={faAngleDown} />
                    : <FontAwesomeIcon icon={faAngleRight} />
                }
              </div>
              :
              data.operate
                ?
                <div onClick={this.handleDisposeOperate.bind(this, data.operate)}>
                  <div className={levelClass} style={{ 'paddingLeft': margLeft }}>
                    <div>
                      {
                        data.level === 0
                          ? <i className={styles.icon} style={{backgroundImage: 'url(./icon/' + data.icon + ')'}} />
                          : ''
                      }
                      <span>{data.name}</span>
                    </div>
                  </div>
                </div>
                :
                  <div className={`${levelClass} ${this.props.activeTabId === data.id ? 'sk-menu-active' : ''}`} style={{ 'paddingLeft': margLeft }} onClick={this.handleDisposeTabBox.bind(this, data)}>
                    <div>
                      {
                        data.level === 0
                          ? <i className={styles.icon} style={{backgroundImage: 'url(./icon/' + data.icon + ')'}} />
                          : ''
                      }
                      <span>{data.name}</span>
                    </div>
                  </div>
          }

          {this.handleCreateMenu(data.children, data.id)}

        </li>
      )
    }

    return menuDom;
  }

  public render() {
    return (
      <div className={'sk-menu-text'}>
        {this.props.data ? this.handleCreateMenu(this.props.data) : <div className={styles.noData}>{'暂无数据'}</div>}
      </div>
    )
  }
}

export default Menu