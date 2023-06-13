import request from "../utils/request"

export const getOrderPreview = () => {
  return request.get('/orders/preview') as Promise<WXResult<OrderPreviewResData>>
}

export const createOrder = (id: number) => {
  return request.post(`/orders?address_id=${id}`) as Promise<WXResult<Order>>
}

export const updateOrderStatusToPaid = (orderId: number, type: string) => {
  return request.patch(`/orders/${orderId}/paytest?type=${type}`)
}