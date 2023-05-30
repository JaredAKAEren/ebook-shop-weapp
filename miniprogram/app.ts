// app.ts
App<IAppOption>({
  globalData: {
    baseUrl: 'https://api.shop.eduwork.cn/api'
  },
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})