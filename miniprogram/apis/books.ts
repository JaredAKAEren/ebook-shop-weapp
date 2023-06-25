import request from '../utils/request'

export const getBookDetails = (id: string) => {
  return request.get<BookResData>(`/goods/${id}`)
}

export const updateBookCollectStatus = (id: number) => {
  return request.post(`/collects/goods/${id}`)
}