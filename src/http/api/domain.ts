import * as qs from 'qs'
import axios from '../http'
import BasePath from '../path'

/**
 * 机构用户模块 接口请求列表
 * @author wanglw 2019/3/5
 */
interface ISaveWg {
    system_id: string;
    workgroup_name: string;
    workgroup_alias: string;
    workgroup_ip: string;
    can_auto_login: string;
    brower_account: string;
    password: string;
    brower_root: string;
    workgroup_type: string;
    it_remarks: string;
}
interface IParams {
    system_id: string;
}
interface IGet {
    params: IParams;
}

// 获取域管理列表表数据
export function getYuList () {
    return axios.get(BasePath + '/work_group/get_list')
}
// 新建域，更新域
export function saveWg (params: ISaveWg) {
    return axios.post(BasePath + '/work_group/save_wg', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 新建，更新时，获取两个下拉菜单
export function getAttribute () {
    return axios.get(BasePath + '/work_group/get_attribute')
}
// 获取详情
export function getInfo (params: IGet) {
    return axios.get(BasePath + '/work_group/get_info', params)
}
// 移出域
export function removeWg (params: IParams) {
    return axios.post(BasePath + '/work_group/remove_wg', qs.stringify(params))
}
// 启用/禁用
export function setStatus (params: IParams) {
    return axios.post(BasePath + '/work_group/set_status', qs.stringify(params))
}