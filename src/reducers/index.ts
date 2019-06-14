import { combineReducers } from 'redux'
import loginState from './loginStateReducer'
import tabBoxState from './tabBoxReducer'
import langsState from './langsReducer'
import modalState from './modalReducer'

export default combineReducers({
  loginState,
  tabBoxState,
  langsState,
  modalState
})