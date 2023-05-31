/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    baseUrl?: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface LoginData {
  email: string,
  password: string,
}

interface HomeQuery {
  page?: number,
  sales?: 1,
  recommend?: 1,
  new?: 1,
}