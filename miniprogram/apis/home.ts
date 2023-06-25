import request from '../utils/request'

export const getHomeData = (query?: HomeQuery) => {
  return request.get<HomeResData>('/index', query)
}