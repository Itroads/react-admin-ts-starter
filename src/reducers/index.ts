import { combineReducers } from 'redux'
import loginState from './loginStateReducer'
import tabBoxState from './tabBoxReducer'
import modalState from './modalReducer'

export default combineReducers({
  loginState,
  tabBoxState,
  modalState
})