//axios基础封装
import axios from "axios";
import { useUserStore } from '@/stores/user'
import router from '@/router'
import {ElMessage} from 'element-plus'

//创建axios实例
const httpInstance = axios.create({
    baseURL:'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000,
})

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1. 从pinia中获取token数据
  const userStore=useUserStore()
  //2. 按照接口文档，添加token数据
  const token=userStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误提示
  const userStore=useUserStore()
  ElMessage({
    type:'warning',
    message:e.response.data.message,
  })
  //401错误，token失效处理
  if(e.response.status===401){
    
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance;