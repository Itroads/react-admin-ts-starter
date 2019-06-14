import * as qs from 'qs'
import axios from '../http'
import BasePath from '../path'

/**
 * 角色管理模块 接口请求列表
 * @author wanglw 2019/2/18
 */

interface IParams {
    view_id?: string;
    system_id?: string;
    fo_ids? :string;
}
interface IRoleGet {
    params: IParams
}
interface IRolePost {
    system_id: string;
    user_ids?: string;
}
interface ICreatUpdateRole {
    system_id: string;
    parent_id?: string;
    full_name: string;
    is_active: string;
    enable_time: string;
    expire_time: string;
    role_remarks: string;
    allocate_to_user: string;
}

 // 获取角色管理列表表头
export function getRoleCols (params: IRoleGet) {
    return axios.get(BasePath + '/view_columns/get_columns',params)
}

// 获取角色管理列表表数据
export function getRoleList () {
    return axios.get(BasePath + '/role/get_role_list')
}

// 新建角色
export function createRole (params: ICreatUpdateRole) {
    return axios.post(BasePath + '/role/create', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 更新角色
export function updateRole (params: ICreatUpdateRole) {
    return axios.post(BasePath + '/role/update', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 删除角色
export function deleteRole (params: IRolePost) {
    return axios.post(BasePath + '/role/delete', qs.stringify(params))
}
// 启用禁用角色
export function changeActiveRole (params: IRolePost) {
    return axios.post(BasePath + '/role/change_active', qs.stringify(params))
}
// 拥有的功能操作
export function getRoleFo (params: IRoleGet) {
    return axios.get(BasePath + '/role/role_fo', params)
}
// 保存功能操作
export function saveRoleFo (params: IRoleGet) {
    return axios.get(BasePath + '/role/save_role_fo', params)
}
// 包含的用户页数据
export function getRoleUser (params: IRoleGet) {
    return axios.get(BasePath + '/role/get_role_user', params)
}
// 更新角色包含的用户
export function roleUser (params: IRolePost) {
    return axios.post(BasePath + '/role/role_user', qs.stringify(params))
}

