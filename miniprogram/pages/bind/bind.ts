// pages/bind/bind.ts
import { redirect } from '../../utils/loginRedirect'
import { postBindingWeChat } from '../../apis/accounts'

Page({
  data: {

  },
  onLoad() {

  },
  toBind: async function handleToBindingWeChat() {
    const openid = wx.getStorageSync('openid')

    try {
      const res = await postBindingWeChat({
        type: 'bind',
        openid
      })
      const userInfo = wx.getStorageSync('userInfo')
      wx.setStorageSync('userInfo', { ...userInfo, openid })
      if (res.statusCode === 204) {
        wx.showToast({
          title: '绑定成功',
          mask: true,
          duration: 1000
        })
        await new Promise((res) => setTimeout(res, 1000))
        redirect()
      }
    } catch (error) {
      // EMPTY
    }
  },
  toSkip: () => {
    redirect()
  }
})