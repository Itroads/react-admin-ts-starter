import axios from '../http'
import * as qs from 'qs'
import BasePath from '../path'

// 获取安全策略初始值
export function getGP () {
  return axios.get(BasePath + '/global_policy_param/get_gp')
}

// 设置初始值
export function setInitValue (id: string) {
  return axios.post(BasePath + '/global_policy_param/resetGP/' + id)
}

// 修改
export function updateGP (id: string, params: any) {
  return axios.post(BasePath + '/global_policy_param/update_gp/' + id, qs.stringify(params))
}

