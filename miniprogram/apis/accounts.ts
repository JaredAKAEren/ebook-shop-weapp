import request from "../utils/request"

const postLogin = (data: loginData) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}

export { postLogin }