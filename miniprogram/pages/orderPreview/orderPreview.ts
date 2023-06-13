// pages/orderPreview/orderPreview.ts
import { getOrderPreview, createOrder, updateOrderStatusToPaid } from '../../apis/orders'
import { extractAreaCode } from '../../utils/utils'

interface PageData {
  orderInfo: null | Order
  payShow: boolean
  payOptions: { name: string, icon: string, type: string }[]
  totalPrice: number
  address: null | Address
  addresses: Address[]
  carts: CartItem[]
}

interface PageMethods {
  orderPreview: () => void
  calcTotalPrice: () => void
  addressOptions: () => void
  cancelPay: () => void
  paymentSelect: (event: VantEvent<{ type: string }>) => void
  openPayment: () => void
}

Page<PageData, PageMethods>({
  data: {
    orderInfo: null,
    payOptions: [{ name: '支付宝', icon: 'qrcode', type: 'aliyun' }],
    payShow: false,
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
  cancelPay: function handleToClosePaymentCancel() {
    this.setData({
      payShow: false
    })
    wx.navigateBack({ delta: 1 })
  },
  paymentSelect: async function handlePayment({ detail }) {
    // console.log(detail.type)
    if (this.data.orderInfo?.id === undefined) return
    try {
      const res = await updateOrderStatusToPaid(this.data.orderInfo.id, detail.type)
      if (res.statusCode !== 200) return
      wx.showToast({
        title: '支付成功',
        mask: false,
        duration: 1000
      })
      this.setData({
        payShow: false
      })
    } catch (error) {
      // EMPTY
    }
  },
  openPayment: async function handleToOpenPaymentPanelAndGenerateOrder() {
    if (this.data.address === null) {
      wx.showToast({
        title: '请添加地址',
        icon: 'error',
        mask: true,
        duration: 1000
      })
      return
    }

    try {
      const res = await createOrder(this.data.address.id)
      if (res.statusCode !== 200) return
      this.setData({
        orderInfo: res.data
      })
    } catch (error) {
      // EMPTY
    }

    this.setData({
      payShow: true
    })
  }
})