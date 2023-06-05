// pages/login/login.ts
import { postLogin } from '../../apis/accounts'
import { redirect } from '../../utils/loginRedirect'
import We = WechatMiniprogram

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
    return this.nullRule(this.data.email, 'emailErrMessage', '邮箱不能为空')
  },
  pwdRule: function passwordValidate(): boolean {
    return this.nullRule(this.data.password, 'pwdErrMessage', '密码不能为空')
  },
  toLogin: async function handleOnLogin() {
    if (this.emailRule() || this.pwdRule()) return

    const loginData = {
      email: this.data.email,
      password: this.data.password
    }

    try {
      const { data }: We.IAnyObject = await postLogin(loginData)
      wx.setStorageSync('token', data.access_token)
      redirect()
    } catch (error) {
      // TODO
    }
  }
})