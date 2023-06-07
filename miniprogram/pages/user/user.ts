// pages/user/user.ts
import { postLogout, getUserInfo, postBindingWeChat } from '../../apis/accounts'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

interface UserData {
  isLogin: boolean
  userInfo: null | UserResData
}

interface UserMethods {
  showDialog: () => void
  updateBind: () => Promise<void>
  toLogout: () => Promise<void>
  fetchUser: () => Promise<void>
}

Page<UserData, UserMethods>({
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
  showDialog: function handleShowBindingChangeDialog() {
    Dialog.confirm({
      title: `${this.data.userInfo?.openid === null ? '绑定' : '解绑'}微信`,
      message: `确定要${this.data.userInfo?.openid === null ? '绑定' : '解绑'}当前微信吗？`,
    }).then(() => {
      this.updateBind()
    }).catch(() => {
      return false
    })
  },
  updateBind: async function handleOnBindingChange() {
    if (this.data.userInfo === null) return
    const openid = wx.getStorageSync('openid')
    const type = this.data.userInfo.openid === null ? 'bind' : 'unbind'

    try {
      const res = await postBindingWeChat({
        type,
        openid
      })

      if (res.statusCode !== 204) return

      const userInfo = wx.getStorageSync('userInfo')
      if (type === 'bind') {
        wx.setStorageSync('userInfo', { ...userInfo, openid })
      } else {
        wx.setStorageSync('userInfo', { ...userInfo, openid: null })
      }

      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })

      wx.showToast({
        title: type === 'bind' ? '绑定成功' : '解绑成功',
        mask: true,
        duration: 1000
      })
    } catch (error) {
      // TODO
    }
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