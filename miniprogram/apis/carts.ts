import request from "../utils/request"

export const addBookToCartList = (data: CartAddData) => {
  return request.post('/carts', data)
}

export const getCartList = () => {
  return request.get('/carts') as Promise<WXResult<CartListResData>>
}