export const isLogin = (redirectUrl: string) => {
  if (wx.getStorageSync('token')) return

  wx.setStorageSync('redirectUrl', redirectUrl)
  wx.redirectTo({ url: '/pages/login/login' })
  wx.showToast({ title: '请登录', icon: 'none' })
}

export const redirect = function redirectAfterLogin() {
  const redirectUrl: string = wx.getStorageSync('redirectUrl') || '/pages/user/user'
  const tarbars = [
    '/pages/home/home',
    '/pages/category/category',
    '/pages/cart/cart',
    '/pages/user/user'
  ]

  if (tarbars.indexOf(redirectUrl) !== -1) {
    wx.switchTab({ url: redirectUrl })
  } else {
    wx.redirectTo({ url: redirectUrl })
  }
}