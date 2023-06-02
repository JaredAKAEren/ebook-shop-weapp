import request from '../utils/request'

export const postLogin = (data: LoginData) => {
  return request.post('/auth/login', data)
}

export const postLogout = () => {
  return request.post('/auth/logout')
}

export const getUserInfo = () => {
  return request.get('/admin/user')
}