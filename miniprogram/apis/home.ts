import request from '../utils/request'

export const getHomeData = (query?: HomeQuery) => {
  return request.get('/index', query) as Promise<WXResult<HomeResData>>
}