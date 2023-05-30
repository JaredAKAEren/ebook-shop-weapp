import request from "../utils/request"

export const postLogin = (data: loginData) => {
  return request.post('/auth/login', data)
}