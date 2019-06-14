
/**
 * action types
 */
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'


const defaultState = {
  status: false,
}

export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}

/**
 * 设置登录状态的 action creator
 * @param status 登录状态
 */
export const setLoginStatus = (status: boolean = false) => {
  return {
    type: SET_LOGIN_STATUS,
    status
  }
}

