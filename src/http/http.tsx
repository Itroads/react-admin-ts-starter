import axios from 'axios'
import { createWarning } from '../components/alert/index'

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  console.error('请求错误码: ' + status);
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
    createWarning('请求错误码: ' + status + ', 3s后返回登录页')
    setTimeout(() => {
      window.sessionStorage.removeItem('empBasic')
      window.location.href = '/login'
    }, 3000);
      break;

    // 505 未登录
    // 不是http的错误码505，是后台自定义的，代表未登录
    case 505:
      // '登录过期，请重新登录'
      createWarning('请求错误码: ' + status + ', 3s后返回登录页')
      setTimeout(() => {
        window.sessionStorage.removeItem('empBasic')
        window.location.href = '/login'
      }, 3000);
      break;
    // 404请求不存在
    case 404:
      // 跳转到 404 页面
      // window.location.href = '/login'
      break;
    case 500:
      // 跳转到 500 页面
      // window.location.href = '/login'
      break;
    default:
      console.log(other);
      return;
  }
}

// 创建axios实例
const instance = axios.create({
  timeout: 60000
});
// instance.defaults.withCredentials = true // 跨域请求时使用凭证
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' // 默认是 ajax 请求
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 设置 post 请求头

// 添加请求拦截器
instance.interceptors.request.use((config: any) => {
  // 在发送请求之前做些什么
  if(window.sessionStorage.getItem('empBasic')) {
    config.headers['Login-Token'] = JSON.parse(window.sessionStorage.getItem('empBasic')).user_token || ''
    config.headers['Session-ID'] = JSON.parse(window.sessionStorage.getItem('empBasic')).session_id || ''
  }
  
  return config;
}, (error: any) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器，过滤数据，只返回 data 部分
instance.interceptors.response.use(
  // 请求成功
  (res: any) => {
    if (res.status === 200) {
      if(!res.data.result) {
        errorHandle(res.data.code, res.data.msg);
      }
      
      return res.data
    } else {
      Promise.reject(res)
    }
  },
  // 请求失败
  (error: any) => {
    
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 根据具体的响应码，做出不同的相应
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 请求超时或断网时
      createWarning('服务器连接已断开或网络延迟过高!')
      return undefined
      
    }
  }
)

export default instance;