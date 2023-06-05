// pages/cart/cart.ts
import { isLogin } from "../../utils/loginRedirect"

Page({
  data: {

  },
  onLoad() {
    isLogin('/pages/cart/cart')
  },
  onReady() {

  },
  onShow() {
    isLogin('/pages/cart/cart')
  }
})