import Notify from '../miniprogram_npm/@vant/weapp/notify/notify'

const http = ({ url, method, data, header }: WXRequestOption): Promise<WXResult<WXAnyObject>> => {
  return new Promise(async (resolve, reject) => {
    // 微信小程序不支持 PATCH 方法，提供 data 添加字段来模拟
    if (method === undefined) {
      method = 'POST'
      data = {
        ...data as object,
        '_method': 'PATCH'
      }
    }

    wx.showLoading({
      mask: true,
      title: '加载中...'
    })

    await new Promise((res) => setTimeout(res, 100))

    wx.request({
      url: (getApp<IAppOption>()?.globalData?.baseUrl ?? '') + url.trim(),
      method: method,
      data: data,
      header: {
        ...header,
        Authorization: 'Bearer ' + (wx.getStorageSync('token') || '')
      },
      timeout: 15000,
      async success(res: WXResult<WXAnyObject>) {
        const data: WXAnyObject = res.data as object
        if (res.statusCode >= 400) {
          let msg = '请求出错'
          switch (res.statusCode) {
            case 400:
              msg = data?.message || '出错了，请重试'
              break
            case 401:
              // 登录验证未通过
              if (url == '/auth/login') {
                msg = '账号或密码错误'
              } else {
                msg = '请登录'
                // token 过期或未登录的情况
                wx.removeStorageSync('token')
                wx.removeStorageSync('redirectUrl')
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
              break
            case 404:
              msg = '资源不存在'
              break
            case 422:
              msg = data?.errors[Object.keys(data?.errors)[0]][0] as string ?? '出错了，请重试'
              msg = msg.replace(/\s+/g, '')
              break
          }

          Notify({ type: 'danger', message: msg })
          reject(res)
        }

        resolve(res)
      },
      fail(err) {
        wx.showToast({
          title: '网络错误',
          icon: 'error',
          duration: 2000
        })

        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

const request = {
  get(url: string, data?: {}, header?: {}) {
    return http({ method: 'GET', url, data, header })
  },
  post(url: string, data?: {}, header?: {}) {
    return http({ method: 'POST', url, data, header })
  },
  put(url: string, data?: {}, header?: {}) {
    return http({ method: 'PUT', url, data, header })
  },
  delete(url: string, data?: {}, header?: {}) {
    return http({ method: 'DELETE', url, data, header })
  },
  patch(url: string, data?: {}, header?: {}) {
    return http({ method: undefined, url, data, header })
  },
  http
}

export default request