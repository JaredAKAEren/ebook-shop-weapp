/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    baseUrl: string,
    cartBooksAmount: number
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  weChatLogin: () => void
  setCartAmount: () => Promise<void>
}

type WXPageOption = WechatMiniprogram.Page.CustomOption
type WXPageScrollOption = WechatMiniprogram.Page.IPageScrollOption
type WXAnyObject = WechatMiniprogram.IAnyObject
type WXRequestOption = WechatMiniprogram.RequestOption
type WXRequestSuccess = WechatMiniprogram.RequestSuccessCallbackResult

interface WXResult<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer> extends WechatMiniprogram.RequestSuccessCallbackResult {
  data: T
}

interface VantEvent<T> extends WechatMiniprogram.BaseEvent {
  detail: T
}

type LoginData = {
  email: string
  password: string
}

type LoginResData = {
  access_token: string
}

type UserResData = {
  openid: string | null
}

type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
  openid?: string
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

type CommentResData = {
  content: string
  star: number
  user: {
    avatar_url: string
    name: string
  }
}

type BookResData = {
  goods: {
    id: number
    comments: CommentResData[]
    cover_url: string
    description: string
    details: string
    is_collect: number
    price: number
    sales: number
    stock: number
    title: string
  }
  like_goods: []
}

type CartAddData = {
  goods_id: string
  num?: string
}

type CartItem = {
  goods: {
    price: number
  }
  id: number
  num: number
  is_checked: number
}

type CartListResData = {
  data: CartItem[]
}

type CartCheckedListData = {
  cart_ids: string[]
}

type CartAmountUpdateData = {
  num: string
}

type Address = {
  is_default: 1 | 0
}

type OrderPreviewResData = {
  address: Address[]
  carts: []
}