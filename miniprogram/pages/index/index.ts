// index.ts
import { getHomeData } from '../../apis/home'

Page({
  data: {
    slides: [],
    books: [],
    currentPage: 0,
    loading: false,
    noData: false,
    showBackTop: false,
    top: 0
  },
  onLoad() {
    this.loadData()
  },
  async loadData() {
    if (this.data.loading) return

    this.setData({
      loading: true
    })

    try {
      const res: WechatMiniprogram.IAnyObject = await getHomeData({ page: this.data.currentPage + 1 })
      // 轮播图只加载一次
      if (this.data.currentPage == 0) {
        this.setData({
          slides: res.data.slides ?? []
        })
      }

      // goods 不为空加载数据，为空显示没有数据了
      if (res?.data?.goods?.data?.length !== 0) {
        this.setData({
          slides: res.data.slides,
          books: [...this.data.books, ...res.data.goods.data as []],
          currentPage: this.data.currentPage += 1,
          loading: false
        })
      } else {
        this.setData({
          noData: true
        })
      }
    } catch (error) {
      this.setData({
        loading: false
      })
    }
  },
  backTop() {
    this.setData({
      top: 0
    })
  },
  onScroll(e: WechatMiniprogram.ScrollViewScroll) {
    if (e.detail.scrollTop > 800) {
      this.setData({
        showBackTop: true
      })
    } else {
      this.setData({
        showBackTop: false
      })
    }
  },
  toBottom() {
    this.loadData()
  }
})
