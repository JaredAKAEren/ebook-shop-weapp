// pages/user/user.ts
import { postLogout, getUserInfo } from '../../apis/accounts'

interface UserData {
  isLogin: boolean
  userInfo: null | {}
}

Page<UserData, WXPageOption>({
  data: {
    isLogin: false,
    userInfo: null
  },
  onLoad() {
  },
  onReady() {
  },
  onShow() {
    this.fetchUser()
  },
  toLogout: async function handleOnLogout() {
    try {
      const res = await postLogout()
      if (res.statusCode === 204) {
        wx.removeStorageSync('token')
        wx.removeStorageSync('redirectUrl')
        wx.removeStorageSync('userInfo')
        this.setData({
          isLogin: false,
          userInfo: null
        })
      }
    } catch (error) {
      // TODO
    }
  },
  fetchUser: async function handleOnGetUserInfo() {
    // 每次进入页面都检查登录状态
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    })

    // 保证页面的 userInfo 不为空
    if (this.data.userInfo === null) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo') || null
      })
    }

    // 没有 token（未登录）或者本地有 userInfo 就返回
    if (!wx.getStorageSync('token') || wx.getStorageSync('userInfo')) return

    try {
      const res = await getUserInfo()
      wx.setStorageSync('userInfo', res.data)
      this.setData({
        userInfo: res.data,
        isLogin: true
      })
    } catch (error) {
      // TODO
    }
  }
})