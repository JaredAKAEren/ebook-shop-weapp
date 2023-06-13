// pages/orderPreview/orderPreview.ts
import { getOrderPreview } from '../../apis/orders'
import { extractAreaCode } from '../../utils/utils'

interface PageData {
  totalPrice: number
  address: null | Address
  addresses: Address[]
  carts: CartItem[]
}

interface PageMethods {
  orderPreview: () => void
  calcTotalPrice: () => void
  addressOptions: () => void
  payment: () => void
}

Page<PageData, PageMethods>({
  data: {
    totalPrice: 0,
    address: null,
    addresses: [],
    carts: []
  },
  onLoad() {
    this.orderPreview()
  },
  onShow() {
    this.orderPreview()
  },
  orderPreview: async function handleFecthOrderPreview() {
    try {
      const res = await getOrderPreview()
      if (res.statusCode !== 200) return
      const defaultAddress = res.data.address.find((item) => item.is_default)
      const [county] = extractAreaCode(defaultAddress?.county ?? '')
      if (county !== '' && defaultAddress?.county !== undefined) {
        defaultAddress.county = county
      }
      this.setData({
        address: res.data.address.find((item) => item.is_default) ?? null,
        addresses: res.data.address,
        carts: res.data.carts
      })

      this.calcTotalPrice()
    } catch (error) {

    }
  },
  calcTotalPrice: function calculateTotalPrice() {
    this.setData({
      totalPrice: this.data.carts.reduce((total, item) => {
        return total += item.num * item.goods.price * 100
      }, 0)
    })
  },
  addressOptions: function handleToAddOrChooseAddress() {
    if (this.data.address === null) {
      wx.navigateTo({ url: '/pages/addressDetail/addressDetail' })
    } else {
      // TODO: popover 选择地址
      console.log('选择地址')
    }
  },
  payment: function handleToGenerateOrder() {
    if (this.data.address === null) {
      wx.showToast({
        title: '请添加地址',
        icon: 'error',
        mask: true,
        duration: 1000
      })
      return
    }
  }
})