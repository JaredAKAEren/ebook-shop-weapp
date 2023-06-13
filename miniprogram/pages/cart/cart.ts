// pages/cart/cart.ts
import { isLogin } from "../../utils/loginRedirect"
import { getCartList, updateCartCheckedStatus, updateCartBookAmount, deleteBookFromCart } from '../../apis/carts'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

interface CartData {
  cartsList: {
    goods: {
      price: number
    }
    id: number
    num: number
    is_checked: number
  }[]
  checkedList: string[]
  allChecked: boolean
  totalPrice: number
}

interface CartMethods {
  delete: (id: number) => void
  deleteDialog: (event: VantEvent<string>) => void
  updateNum: (event: VantEvent<number>) => void
  fetchCartList: () => void
  check: (event: WechatMiniprogram.BaseEvent) => void
  allChecked: () => void
  changeAllChecked: () => void
  calcTotalPrice: () => void
  order: (id: string) => void
}

const AppData = getApp<IAppOption>().globalData

Page<CartData, CartMethods>({
  data: {
    cartsList: [],
    checkedList: [],
    allChecked: false,
    totalPrice: 0
  },
  onLoad() {
    isLogin('/pages/cart/cart')
  },
  onReady() {

  },
  onShow() {
    isLogin('/pages/cart/cart')
    this.fetchCartList()
  },
  fetchCartList: async function handleFecthCartList() {
    const res = await getCartList('goods')
    if (res.statusCode === 200) {
      this.setData({
        cartsList: res.data.data
      })
    }

    this.setData({
      checkedList: this.data.cartsList.filter((item) => item.is_checked === 1).map((item) => `${item.id}`)
    })

    this.changeAllChecked()
    this.calcTotalPrice()
  },
  changeAllChecked: function handleChangeAllCheckedStatus() {
    if (
      this.data.cartsList.length === this.data.checkedList.length
      && this.data.cartsList.length !== 0
      && this.data.checkedList.length !== 0
    ) {
      this.setData({
        allChecked: true
      })
    } else {
      this.setData({
        allChecked: false
      })
    }
  },
  calcTotalPrice: function handleToCalculateTotalPrice() {
    this.setData({
      totalPrice: this.data.cartsList.filter((item) => item.is_checked === 1).reduce((total, book) => {
        return total += (book.goods.price * book.num * 100)
      }, 0)
    })
  },
  check: async function handleOnCheckChange(event) {
    const id = event.currentTarget.dataset.id
    const book = this.data.cartsList.find((item) => item.id === id)

    if (this.data.checkedList.indexOf(`${id}`) === -1) {
      this.data.checkedList.push(`${id}`)
      if (book !== undefined) {
        book.is_checked = 1
      }
    } else {
      this.data.checkedList.splice(this.data.checkedList.indexOf(`${id}`), 1)
      if (book !== undefined) {
        book.is_checked = 0
      }
    }

    const res = await updateCartCheckedStatus({ cart_ids: this.data.checkedList })
    if (res.statusCode !== 204) return

    this.setData({
      checkedList: this.data.checkedList,
      cartsList: this.data.cartsList
    })

    this.changeAllChecked()
    this.calcTotalPrice()
  },
  allChecked: async function handleOnAllCheckChange() {
    let checked: string[] = []
    this.data.cartsList.forEach((item) => item.is_checked = 0)
    if (!this.data.allChecked) {
      checked = this.data.cartsList.map((item) => `${item.id}`)
      this.data.cartsList.forEach((item) => item.is_checked = 1)
    }

    const res = await updateCartCheckedStatus({ cart_ids: checked })
    if (res.statusCode !== 204) return

    this.setData({
      allChecked: !this.data.allChecked,
      checkedList: checked,
      cartsList: this.data.cartsList
    })

    this.calcTotalPrice()
  },
  updateNum: async function handleOnBookAmountChange(event) {
    if (event.detail === event.currentTarget.dataset.num) return
    try {
      await updateCartBookAmount(event.currentTarget.dataset.id, { num: `${event.detail}` })
      const item = this.data.cartsList.find((item) => item.id === event.currentTarget.dataset.id)
      if (item !== undefined) {
        item.num = event.detail
      }

      this.setData({
        cartsList: this.data.cartsList
      })

      this.calcTotalPrice()
    } catch (error) {
      const item = this.data.cartsList.find((item) => item.id === event.currentTarget.dataset.id)
      if (item !== undefined) {
        item.num = event.currentTarget.dataset.num
      }

      this.setData({
        cartsList: this.data.cartsList
      })
    }
  },
  deleteDialog: function handleShowDeleteDialog(event) {
    if (event.detail !== 'right') return
    Dialog.confirm({
      title: '删除',
      message: '确定要删除此商品吗？',
    }).then(() => {
      this.delete(event.currentTarget.dataset.id)
    }).catch(() => {
      return false
    })
  },
  delete: async function handleToDeleteBook(id) {
    try {
      const res = await deleteBookFromCart(id)
      if (res.statusCode !== 204) return
      wx.showToast({
        title: '删除成功！',
        mask: true,
        duration: 1000
      })

      this.setData({
        cartsList: this.data.cartsList.filter((item) => item.id !== id),
        checkedList: this.data.checkedList.filter((item) => item !== `${id}`)
      })

      AppData.cartBooksAmount -= 1
      this.changeAllChecked()
      this.calcTotalPrice()
    } catch (error) {

    }
  },
  order: function handleSubmitOrder() {
    if (this.data.checkedList.length === 0) {
      wx.showToast({
        title: '请选中任意商品',
        icon: 'error',
        mask: true,
        duration: 1000
      })
      return
    }

    wx.navigateTo({ url: '/pages/orderPreview/orderPreview' })
  }
})