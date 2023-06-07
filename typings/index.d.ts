/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    baseUrl?: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  weChatLogin: () => void
}

type WXPageOption = WechatMiniprogram.Page.CustomOption
type WXPageScrollOption = WechatMiniprogram.Page.IPageScrollOption
type WXAnyObject = WechatMiniprogram.IAnyObject
type WXRequestOption = WechatMiniprogram.RequestOption
type WXRequestSuccess = WechatMiniprogram.RequestSuccessCallbackResult

interface WXResult<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer> extends WechatMiniprogram.RequestSuccessCallbackResult {
  data: T
}

type LoginData = {
  email: string
  password: string
}

type LoginResData = {
  access_token: string
}

type UserResData = {
  openid: string
}

type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

/**
 * 微信登录请求 data 的数据类型
 */
type WeLoginData = {
  appid: string
  secret: string
  key: number[]
  js_code: string
}

/**
 * 微信登录响应 data 的数据类型
 */
type WeChatLoginResData = {
  access_token: string
  openid: string
  /** 用户信息 */
  user: string | {}
}

type BindingWeChatData = {
  type: string
  openid: string
}

type HomeQuery = {
  page?: number
  sales?: 1
  recommend?: 1
  new?: 1
}

type HomeResData = {
  categories: []
  goods: {
    current_page: number
    /** 图书列表 */
    data: []
  }
  slides: []
}