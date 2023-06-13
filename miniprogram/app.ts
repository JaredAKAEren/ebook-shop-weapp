// app.ts
import { postWeChatLogin } from './apis/accounts'
import { getCartList } from './apis/carts'

App<IAppOption>({
  globalData: {
    cartBooksAmount: -1,
    baseUrl: 'https://api.shop.eduwork.cn/api'
  },
  onLaunch() {
    // 微信登录
    this.weChatLogin()
  },
  setCartAmount: async function handleFecthCartListLength() {
    if (!wx.getStorageSync('token')) return
    const res = await getCartList()
    if (res.statusCode === 200) {
      this.globalData.cartBooksAmount = res.data.data.length
    }
  },
  weChatLogin: function handleOnWeChatLogin() {
    if (wx.getStorageSync('token')) return
    wx.login({
      success: async weRes => {
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

        this.setCartAmount()
      }
    })
  }
})