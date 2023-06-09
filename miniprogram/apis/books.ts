import request from '../utils/request'

export const getBookDetails = (id: string) => {
  return request.get(`/goods/${id}`) as Promise<WXResult<BookResData>>
}

export const updateBookCollectStatus = (id: number) => {
  return request.post(`/collects/goods/${id}`)
}