// pages/user/user.ts
import { postLogout } from '../../apis/accounts'

Page({
  data: {
    isLogin: false
  },
  onLoad() {

  },
  onReady() {

  },
  onShow() {
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    })
  },
  toLogout: async function handleOnLogiout() {
    try {
      const res = await postLogout()
      if (res.statusCode === 204) {
        wx.removeStorageSync('token')
        this.setData({
          isLogin: false
        })
      }
    } catch (error) {
      // TODO
    }
  }
})