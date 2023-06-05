/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    baseUrl?: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

type WXPageOption = WechatMiniprogram.Page.CustomOption
type WXPageScrollOption = WechatMiniprogram.Page.IPageScrollOption
type WXAnyObject = WechatMiniprogram.IAnyObject
type WXRequestOption = WechatMiniprogram.RequestOption
type WXRequestSuccess = WechatMiniprogram.RequestSuccessCallbackResult

type LoginData = {
  email: string
  password: string
}

type HomeQuery = {
  page?: number
  sales?: 1
  recommend?: 1
  new?: 1
}