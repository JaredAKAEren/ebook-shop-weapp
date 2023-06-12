import request from "../utils/request"

export const getOrderPreview = () => {
  return request.get('/orders/preview') as Promise<WXResult<OrderPreviewResData>>
}