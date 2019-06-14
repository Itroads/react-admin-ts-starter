import * as qs from 'qs'
import axios from '../http'
import BasePath from '../path'

/**
 * 主页 功能模块 接口请求列表
 * @author Jiang yang 2018/08/23
 */

interface IParams {
  parent_id?: string
  resource_id?: string
}
interface IGetUserRightMenu {
  params: IParams
}

interface IChangePwd {
  type: string,
  oldpassword: string,
  newpassword: string
}

interface IChangeLang {
  lang_id: string
}

// 左侧菜单
export function getLeftMenu() {
  return axios.get(BasePath + '/menus')
}

// 登录请求
export function LoginOn(params: any) {
  return axios.post(BasePath + '/login/logon', qs.stringify(params))
}

// 右侧菜单
export function getUserRightMenu (params: IGetUserRightMenu) {
  return axios.get(BasePath + '/options', params)
}

// 修改密码
export function changePassword (params: IChangePwd) {
  return axios.post(BasePath + '/login/change_password', qs.stringify(params))
}

// 修改语言
export function changeLanguage (params: IChangeLang) {
  return axios.post(BasePath + '/change_lang', qs.stringify(params))
}

// 模块列表
export function modulesList () {
  return axios.get(BasePath + '/modules')
}

