import request from "../utils/request"

export const getOrderPreview = () => {
  return request.get<OrderPreviewResData>('/orders/preview')
}

export const createOrder = (id: number) => {
  return request.post<Order>(`/orders?address_id=${id}`)
}

export const updateOrderStatusToPaid = (orderId: number, type: string) => {
  return request.patch(`/orders/${orderId}/paytest?type=${type}`)
}