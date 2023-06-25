import request from "../utils/request"

export const addBookToCartList = (data: CartAddData) => {
  return request.post('/carts', data)
}

export const getCartList = (include?: string) => {
  let url = '/carts'
  if (include !== undefined) {
    url += `?include=${include}`
  }
  return request.get<CartListResData>(url)
}

export const updateCartCheckedStatus = (data: CartCheckedListData) => {
  const parseData = {
    cart_ids: data.cart_ids.map((item) => parseInt(item))
  }
  return request.patch('/carts/checked', parseData)
}

export const updateCartBookAmount = (id: number, data: CartAmountUpdateData) => {
  return request.put(`/carts/${id}`, data)
}

export const deleteBookFromCart = (id: number) => {
  return request.delete(`/carts/${id}`)
}