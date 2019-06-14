
// action type

const SET_LANGUAGE = 'SET_LANGUAGE' // 添加一个 tab

const defaultState = {
  langs: navigator.language
}

// reducer 
export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        langs: action.langs
      }

    default:
      return state;
  }
}


// action creator

export const setLanguage = (langs: string) => {
  return {
    type: SET_LANGUAGE,
    langs
  }
}