import request from '../utils/request'
import { decodeSecret } from '../utils/utils'

export const postLogin = (data: LoginData) => {
  return request.post<LoginResData>('/auth/login', data)
}

export const postLogout = () => {
  return request.post('/auth/logout')
}

export const postRegister = (data: RegisterData) => {
  return request.post('/auth/register', data)
}

export const postWeChatLogin = (data: WeLoginData) => {
  const { key, ...relData } = data
  relData.secret = decodeSecret(data.secret, data.key)
  return request.post<WeChatLoginResData>('/auth/wx/code', relData)
}

export const postBindingWeChat = (data: BindingWeChatData) => {
  return request.post('/auth/wx/bind', data)
}

export const getUserInfo = () => {
  return request.get<UserResData>('/admin/user')
}