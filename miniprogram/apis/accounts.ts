import request from '../utils/request'

export const postLogin = (data: LoginData) => {
  return request.post('/auth/login', data)
}