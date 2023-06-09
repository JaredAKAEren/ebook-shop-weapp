// pages/book/book.ts
import { getBookDetails, updateBookCollectStatus } from '../../apis/books'
import { addBookToCartList } from '../../apis/carts'

interface BookData {
  cartBooksAmount: number,
  recommendBooks: []
  bookData: null | {
    id: number
    title: string
    is_collect: number
  }
  active: 0 | 1 | 2
}

interface BookMethods {
  addCart: () => void
  collect: () => void
  loadBookData: (id: string) => void
}

const AppData = getApp<IAppOption>()?.globalData

Page<BookData, BookMethods>({
  data: {
    cartBooksAmount: AppData.cartBooksAmount,
    recommendBooks: [],
    bookData: null,
    active: 0
  },
  onLoad(option) {
    this.loadBookData(option.id ?? '0')
  },
  onShow() {
    this.setData({
      cartBooksAmount: AppData.cartBooksAmount
    })
  },
  addCart: async function handleAddBookToCartList() {
    const res = await addBookToCartList({ goods_id: `${this.data.bookData?.id}` })
    if (res.statusCode === 201) {
      AppData.cartBooksAmount += 1
      this.setData({
        cartBooksAmount: ++this.data.cartBooksAmount
      })
    } else if (res.statusCode === 201 || res.statusCode === 204) {
      wx.showToast({
        title: '已加入购物车',
        mask: true,
        duration: 1000
      })
    }
  },
  collect: async function handleOnChangeCollectStatus() {
    const res = await updateBookCollectStatus(this.data.bookData?.id ?? 0)

    if (res.statusCode === 201) {
      if (this.data.bookData?.is_collect !== undefined) {
        this.data.bookData.is_collect = 1
      }
      wx.showToast({
        title: '已收藏',
        mask: true,
        duration: 1000
      })
    } else if (res.statusCode === 204) {
      if (this.data.bookData?.is_collect !== undefined) {
        this.data.bookData.is_collect = 0
      }
      wx.showToast({
        title: '已取消收藏',
        mask: true,
        duration: 1000
      })
    } else {
      return
    }

    this.setData({
      bookData: this.data.bookData
    })
  },
  loadBookData: async function handleToFetchBookData(id: string) {
    const res = await getBookDetails(id)
    if (res.statusCode !== 200) return
    this.setData({
      recommendBooks: res.data.like_goods,
      bookData: res.data.goods
    })
    wx.setNavigationBarTitle({
      title: this.data?.bookData?.title || '图书详情'
    })
  }
})