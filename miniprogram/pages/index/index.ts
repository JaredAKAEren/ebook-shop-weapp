// index.ts
import { postLogin } from '../../apis/accounts'
// 获取应用实例
// const app = getApp<IAppOption>()

Page({
  data: {

  },
  onLoad() {
    postLogin({ email: 'test@a.com', password: '123123' })
  },
})
