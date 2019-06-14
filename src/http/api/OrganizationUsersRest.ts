import * as qs from 'qs'
import axios from '../http'
import BasePath from '../path'

/**
 * 机构用户模块 接口请求列表
 * @author wanglw 2019/2/25
 */
interface IParams {
    parent_org_id?: string;
    system_id?: string;
    belong_org?: string;
    user_id?: string;
}
interface IGet {
    params: IParams
}
interface ICreatOrg {
    system_id: string;
    parent_id: string;
    full_name: string;
    od_remarks: string;
}
interface IChangeOrg {
    org_id: string;
    agent_datas: string
}
interface ICreateUser {
    system_id?: string;
    belong_org?: string;
    login_code: string;
    full_name: string;
    is_active: string;
    enable_time: string;
    expire_time: string;
    it_remark: string;
    reset_password: string;
    is_locked: string;
}
interface IQueryRoleByAccountId {
    system_id?: string;
    tree_json: string;
    user_id?: string;
}
interface IHuaWeiUserImport {
    group_id: string;
    page_count: string;
    page_size: string;
}

interface IExtension {
    org_id: string;
    tree_json: string;
}

// 第一次获取机构
export function queryOrg () {
    return axios.get(BasePath + '/org_info/query_org')
}
// 第二次获取机构
export function queryOu (params: IGet) {
    return axios.get(BasePath + '/org_info/query_ou', params)
}
// 新建机构
export function createOrg (params: ICreatOrg) {
    return axios.post(BasePath + '/org_info/create', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 更新时获取节点数据
export function getOrgInfo (params: IGet) {
    return axios.get(BasePath + '/org_info/get_org_info', params)
}
// 更新机构
export function updateOrg (params: ICreatOrg) {
    return axios.post(BasePath + '/org_info/update', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 删除机构
export function deleteOrg (params: IGet) {
    return axios.get(BasePath + '/org_info/delete', params)
}
// 机构包含的坐席树接口
export function getAgentTree () {
    return axios.get(BasePath + '/org_info/get_agent_tree')
}
// 机构包含的坐席确定按钮
export function changeOrg (params: IChangeOrg) {
    return axios.post(BasePath + '/org_info/change_org', qs.stringify(params))
}
// 新建用户
export function createUser (params: ICreateUser) {
    return axios.post(BasePath + '/account/create_account', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 从华为平台导入-获取左侧
export function getHuaWeiImportOrgList () {
    return axios.get(BasePath + '/org_info/get_hua_wei_import_org_list')
}
// 从华为平台导入-点击左侧获取右侧
export function getHuaWeiUserImport (params: IHuaWeiUserImport) {
    return axios.post(BasePath + '/org_info/get_hua_wei_user_import', qs.stringify(params))
}
// 从华为平台导入-点击保存
export function addHuaWeiImport (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/org_info/add_hua_wei_import', qs.stringify(params))
}



// 管理员/非管理员
export function setDeptManager (params: IParams) {
    return axios.post(BasePath + '/account/set_dept_manager', qs.stringify(params))
}
// 账户信息，初始化信息
export function getAccountInfo (params: IGet) {
    return axios.get(BasePath + '/account/get_account_info', params)
}
// 账户信息，保存信息
export function updateAccount (params: ICreateUser) {
    return axios.post(BasePath + '/account/update_account', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 用户扩展信息
export function getExtensionInfo (params: IGet) {
    return axios.get(BasePath + '/account/get_extension_info', params)
}
// 更新用户扩展信息
export function updateUserInfoExtension (params: any) {
    return axios.post(BasePath + '/account/update_user_info_extension', params, {headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 删除用户
export function deleteAccount (params: IGet) {
    return axios.get(BasePath + '/account/delete_account', params)
}
// 启用/禁用
export function changeActiveAccount (params: IParams) {
    return axios.post(BasePath + '/account/change_active_account', qs.stringify(params))
}
// 获取拥有的角色
export function getRoleByAccountId (params: IGet) {
    return axios.get(BasePath + '/account/get_role_by_account_id', params)
}
// 保存拥有的角色
export function queryRoleByAccountId (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/account/query_role_by_account_id', qs.stringify(params))
}
// 获取管理的账户
export function queryUserByUser (params: IGet) {
    return axios.get(BasePath + '/account/query_user_by_user', params)
}
// 更新管理的账户
export function queryUserByAccountId (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/account/query_user_by_account_id', qs.stringify(params))
}
// 获取组和设备树
export function getGroupDeviceTree (params: IGet) {
    return axios.get(BasePath + '/account/get_group_device_tree', params)
}
// 更新组和设备树
export function queryUserByGroupDevice (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/account/query_user_by_group_device', qs.stringify(params))
}
// 获取组和拓扑树
export function getTopologyTree (params: IGet) {
    return axios.get(BasePath + '/account/get_topology_tree', params)
}
// 更新组和设备树
export function addUserByTopology (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/account/add_user_by_topology', qs.stringify(params))
}
// 获取组和宿主树
export function getAllLogHostTree (params: IGet) {
    return axios.get(BasePath + '/account/get_all_log_host_tree', params)
}
// 更新组和宿主树
export function addLogHost (params: IQueryRoleByAccountId) {
    return axios.post(BasePath + '/account/add_log_host', qs.stringify(params))
}


// 获取机构和分机的树
export function getExtensionTree () {
    return axios.get(BasePath + '/org_info/extension_list')
}

// 保存向机构导入分机的操作
export function saveExtension (params: IExtension) {
    return axios.post(BasePath + '/org_info/save_extension', qs.stringify(params))
}

// 获取用户和分机的树
export function getExtensionToUser (params: {select_id: string}) {
    return axios.post(BasePath + '/account/extension_to_user', qs.stringify(params))
}

// 保存用户和分机的操作
export function saveExtensionToUser (params: {user_id: string; tree_json: string;}) {
    return axios.post(BasePath + '/account/save_extension_to_user', qs.stringify(params))
}

// 删除分机
export function deleteExtension (params: {extension_ids: string;}) {
    return axios.post(BasePath + '/org_info/delete_extension', qs.stringify(params))
}
