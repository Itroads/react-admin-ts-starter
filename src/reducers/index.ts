import { combineReducers } from 'redux'
import loginState from './loginStateReducer'
import tabBoxState from './tabBoxReducer'
import modalState from './modalReducer'

export default combineReducers({
  loginState, // 登录状态 - 目前没怎么用
  tabBoxState, // 控制tab页的打开，关闭，切换，设置默认页
  modalState // 控制当前激活 tab 页内的弹窗数量，一般为1个，即已有一个弹窗时，无法出现第二个
})