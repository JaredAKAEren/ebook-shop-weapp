// pages/login/login.ts
import { postLogin } from '../../apis/accounts'
import { redirect } from '../../utils/loginRedirect'
import { notNullRule } from '../../utils/validateRules'

Page({
  data: {
    email: 'makima@hk.com',
    password: 'Makima111',
    emailErrMessage: '',
    pwdErrMessage: ''
  },
  nullRule: function nullValidate(value: string, key: string, msg: string): boolean {
    if (value === '') {
      this.setData({ [key]: msg })
      return true
    }

    this.setData({ [key]: '' })
    return false
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

    const loginData = {
      email: this.data.email,
      password: this.data.password
    }

    try {
      const { data }: WXAnyObject = await postLogin(loginData)
      wx.setStorageSync('token', data.access_token)
      redirect()
    } catch (error) {
      // TODO
    }
  }
})