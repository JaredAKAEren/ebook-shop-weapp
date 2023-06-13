// pages/register/register.ts
import { postRegister } from '../../apis/accounts'
import { nameRule, emailRule, passwordRule, identicalRule } from '../../utils/validateRules'

Page({
  data: {
    name: 'denji',
    email: 'denji@hk.com',
    password: 'Denji111',
    passwordConfirm: 'Denji111',
    nameErrMessage: '',
    emailErrMessage: '',
    pwdErrMessage: '',
    pwdConfirmErrMessage: ''
  },
  nameRule: function nameValidate(): Boolean {
    return nameRule({
      that: this,
      value: this.data.name,
      key: 'nameErrMessage',
      label: '昵称',
      msg: '4-16位字母，数字，"_"，"-"',
      min: 4,
      max: 16
    })
  },
  emailRule: function emailValidate(): boolean {
    return emailRule({
      that: this,
      value: this.data.email,
      key: 'emailErrMessage',
      label: '邮箱',
      msg: '邮箱格式不正确'
    })
  },
  pwdRule: function passwordValidate(): boolean {
    return passwordRule({
      that: this,
      value: this.data.password,
      key: 'pwdErrMessage',
      label: '密码',
      msg: '8-16位包含大小写字母以及数字',
      min: 8,
      max: 16
    })
  },
  pwdConfirmRule: function passwordConfirmValidate(): boolean {
    return identicalRule({
      that: this,
      value: this.data.password,
      validateVal: this.data.passwordConfirm,
      label: '确认密码',
      key: 'pwdConfirmErrMessage',
      msg: '两次输入密码不一致'
    })
  },
  wxRegister: function handleToBindingOpenIdAndRegister() {
    const openid = wx.getStorageSync('openid')
    this.toRegister(openid)
  },
  toRegister: async function handleOnRegister(openid?: string) {
    if (!this.nameRule() || !this.emailRule() || !this.pwdRule() || !this.pwdConfirmRule()) return

    const registerData: RegisterData = {
      name: this.data.name,
      email: this.data.email,
      password: this.data.password,
      password_confirmation: this.data.passwordConfirm
    }

    !openid || (registerData.openid = openid)

    try {
      const res = await postRegister(registerData)
      if (res.statusCode === 201) {
        wx.showToast({
          title: '注册成功',
          mask: true,
          duration: 1000
        })
        await new Promise((res) => setTimeout(res, 1000))
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    } catch (error) {
      // EMPTY
    }
  }
})