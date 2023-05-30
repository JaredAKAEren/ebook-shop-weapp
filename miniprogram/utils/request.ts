const base = getApp<IAppOption>().globalData.baseUrl

const http = ({ url, method, data, header }: WechatMiniprogram.RequestOption) => {
  return new Promise((resolve, reject) => {
    // 微信小程序不支持 PATCH 方法，提供 data 添加字段来模拟
    if (method === undefined) {
      method = 'POST'
      data = {
        ...data as object,
        '_method': 'PATCH'
      }
    }

    wx.showLoading({
      title: '加载中...'
    })

    wx.request({
      url: base?.trim() + url.trim(),
      method: method,
      data: data,
      header: {
        ...header
      },
      timeout: 15000,
      success(res) {
        const data: WechatMiniprogram.IAnyObject = res.data as object
        if (res.statusCode >= 400) {
          let msg = '请求出错'
          switch (res.statusCode) {
            case 400:
              msg = data?.message ?? '出错了，请重试'
              break
            case 401:
              // TODO: 登录重定向
              msg = '请登录'
              break
            case 404:
              msg = '资源不存在'
              break
            case 422:
              msg = data?.error[Object.keys(data?.error)[0]][0] ?? '出错了，请重试'
              break
          }

          wx.showToast({
            title: msg,
            icon: 'error',
            duration: 2000
          })
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