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
    this.fetchUser()
  },
  onReady() {

  },
  onShow() {
    this.fetchUser()
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    })
  },
  toLogout: async function handleOnLogout() {
    try {
      const res = await postLogout()
      if (res.statusCode === 204) {
        wx.removeStorageSync('token')
        wx.removeStorageSync('redirectUrl')
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
    if (!wx.getStorageSync('token') || this.data.userInfo !== null) return

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