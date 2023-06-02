// pages/user/user.ts
import { postLogout, getUserInfo } from '../../apis/accounts'

Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  onLoad() {
    this.fetchUser()
  },
  onReady() {

  },
  onShow() {
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    })
  },
  toLogout: async function handleOnLogout() {
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
  },
  fetchUser: async function handleOnGetUserInfo() {
    try {
      const res = await getUserInfo()
      if (res?.statusCode !== 200) return
      this.setData({
        userInfo: res.data
      })
    } catch (error) {
      // TODO
    }
  }
})