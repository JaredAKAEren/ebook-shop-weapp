const base = getApp<IAppOption>().globalData.baseUrl

const request = ({ url, method, data, header }: WechatMiniprogram.RequestOption) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: base?.trim() + url.trim(),
      method: method,
      data: data,
      header: {
        ...header
      },
      timeout: 15000,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export default request