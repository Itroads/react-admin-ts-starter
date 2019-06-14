/**
 * 用于处理，当有弹窗时，右侧操作菜单，不允许点击
 * 以当前激活 id 为 key 值，value 为每个单位为 0  的数组，只是用来记录当前页，有多少个打开的窗口
 * 一般情况下，只有一个，但防止，多个请求发起，异步产生的 alert 弹窗
 * 所以，以数组长度，来记录
 * 
 * 也许不应该用数组，直接用数字来处理，0 的时候就没有弹窗。有几个弹窗就是数字几
 */

// action type
const ADD_DIALOG_DATA = 'ADD_DIALOG_DATA'
const DELETE_DIALOG_DATA = 'DELETE_DIALOG_DATA'

interface IState {
  [key: string]: number
}

interface IAction {
  type: string;
  key: string;
}

const defaultState: IState = {}

// reducer
export default (state: IState = defaultState, action: IAction) => {
  switch(action.type) {
    case ADD_DIALOG_DATA:
      const obj = {}
      obj[action.key] = state[action.key] && state[action.key] >= 0 ? state[action.key] + 1 : 1
      
      return {
        ...state,
        ...obj
      }

    case DELETE_DIALOG_DATA: 
    const arr = {}
      if(state[action.key] > 0) {
        arr[action.key] = state[action.key] - 1
      }
      
      return {
        ...state,
        ...arr
      }
    default:
      return state;
  }
}

// 根据 key，一次添加一个数组长度
export const addDialogData = (key: string) => {
  return {
    type: ADD_DIALOG_DATA,
    key
  }
}

// 根据 key ，一次，剪掉数组一个长度
export const deleteDialogData = (key: string) => {
  return {
    type: DELETE_DIALOG_DATA,
    key
  }
}