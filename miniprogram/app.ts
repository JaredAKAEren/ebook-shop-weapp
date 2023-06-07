// app.ts
import { postWeChatLogin } from './apis/accounts'

App<IAppOption>({
  globalData: {
    baseUrl: 'https://api.shop.eduwork.cn/api'
  },
  onLaunch() {
    // 登录
    wx.login({
      success: async weRes => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (!weRes.code) return
        const weLoginData: WeLoginData = {
          appid: 'wxe806e1c3078335f3',
          secret: 'a2d7c6ea92ad626f675895c40edf',
          key: [6, 11, 17, 20],
          js_code: weRes.code,
        }
        const res = await postWeChatLogin(weLoginData)
        wx.setStorageSync('openid', res.data.openid)

        if (res.data.access_token !== '') {
          wx.setStorageSync('token', res.data.access_token)
          wx.setStorageSync('userInfo', res.data.user)
        }
      }
    })
  }
})