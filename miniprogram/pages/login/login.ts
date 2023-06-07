// pages/login/login.ts
import { postLogin, getUserInfo } from '../../apis/accounts'
import { redirect } from '../../utils/loginRedirect'
import { notNullRule } from '../../utils/validateRules'

Page({
  data: {
    email: 'ErenBindTest@gmail.com',
    password: 'ErenBindTest111',
    emailErrMessage: '',
    pwdErrMessage: ''
  },
  onUnload() {
    wx.removeStorageSync('redirectUrl')
  },
  emailRule: function emailValidate(): boolean {
    return notNullRule({
      that: this,
      value: this.data.email,
      key: 'emailErrMessage',
      label: '邮箱'
    })
  },
  pwdRule: function passwordValidate(): boolean {
    return notNullRule({
      that: this,
      value: this.data.password,
      key: 'pwdErrMessage',
      label: '密码'
    })
  },
  toLogin: async function handleOnLogin() {
    if (!this.emailRule() || !this.pwdRule()) return

    const loginData: LoginData = {
      email: this.data.email,
      password: this.data.password
    }

    try {
      const { data } = await postLogin(loginData)
      wx.setStorageSync('token', data.access_token)
      const res = await getUserInfo()
      wx.setStorageSync('userInfo', res.data)
      if (res.data.openid === null) {
        wx.redirectTo({
          url: '/pages/bind/bind'
        })
      } else {
        redirect()
      }
    } catch (error) {
      // TODO
    }
  }
})