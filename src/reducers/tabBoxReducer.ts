
// action type

const ADD_TAB_BOX = 'ADD_TAB_BOX' // 添加一个 tab
const DELETE_TAB_BOX = 'DELETE_TAB_BOX' // 删除一个 tab
const TOGGLE_TAB_BOX = 'CHANGE_TAB_BOX' // 切换当前的 tab
const SET_DEFAULT_TAB = 'SET_DEFAULT_TAB' // 设置默认页

const defaultState: IDefaultState = {
  tabData: [],
  activeTabId: ''
}

// reducer 
export default (state: any = defaultState, action: any) => {
  const newTabData = state.tabData;
  switch (action.type) {
    case ADD_TAB_BOX:
      for(const item of newTabData) {
        if(item.id === action.tabItem.id) { // 点击相同的页面，则选中
          return {...state, activeTabId: item.id}
        }
      }
      return {
        tabData: [...state.tabData, action.tabItem],
        activeTabId: action.tabItem.id
      }

    case DELETE_TAB_BOX:
      let activeId = state.activeTabId;
      for(let i = 0; i < newTabData.length; i++) {
        if(newTabData[i].id === action.tabId) {

          // 删除时，如果当前tab为选中状态，判断前后是否有值，前面有则激活前一个，前面没有，就激活后一个，都没有就空
          // 如果不是选中的，就保持原来的状态
          if(action.tabId === state.activeTabId) {
            if(newTabData[i-1]){
              activeId = newTabData[i-1].id
            } else if(newTabData[i+1]) {
              activeId = newTabData[i+1].id
            } else {
              activeId = ''
            }
          }
          
          newTabData.splice(i--, 1)
        }
      }
      return {
        ...state,
        activeTabId: activeId, 
        tabData: newTabData
      }

    case TOGGLE_TAB_BOX:
      return {
        ...state,
        activeTabId: action.tabId
      }

    case SET_DEFAULT_TAB:
      return {
        tabData: [{ id: action.tabItem.id, name: action.tabItem.name, tabIcon: action.tabItem.tabIcon }],
        activeTabId: action.tabItem.id
      }

    default:
      return state;
  }
}


// action creator

export const addTabBox = (tabItem: ITabItem) => {
  return {
    type: ADD_TAB_BOX,
    tabItem
  }
}

export const deleteTabBox = (tabId: string) => {
  return {
    type: DELETE_TAB_BOX,
    tabId
  }
}

export const toggleTabBox = (tabId: string) => {
  return {
    type: TOGGLE_TAB_BOX,
    tabId
  }
}

export const setDefaultTab = (tabItem: ITabItem) => {
  return {
    type: SET_DEFAULT_TAB,
    tabItem
  }
}