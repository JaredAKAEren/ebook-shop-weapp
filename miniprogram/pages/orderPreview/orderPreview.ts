// pages/orderPreview/orderPreview.ts
import { getOrderPreview } from '../../apis/orders'

interface PageData {
  totalPrice: number
  address: null | Address
  carts: CartItem[]
}

interface PageMethods {
  orderPreview: () => void
  calcTotalPrice: () => void
  payment: () => void
}

Page<PageData, PageMethods>({
  data: {
    totalPrice: 0,
    address: null,
    carts: []
  },
  onLoad() {
    this.orderPreview()
  },
  onShow() {

  },
  orderPreview: async function handleFecthOrderPreview() {
    try {
      const res = await getOrderPreview()
      if (res.statusCode !== 200) return
      this.setData({
        address: res.data.address.find((item) => item.is_default) ?? null,
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