// home.ts
import { getHomeData } from '../../apis/home'

interface HomeData {
  slides: []
  books: []
  currentPage: number
  loading: boolean
  noData: boolean
  showBackTop: boolean
  timer: null | number
  lastEvent: number
  innerIndex?: number
  outerIndex?: number
}

Page<HomeData, WXPageOption>({
  data: {
    slides: [],
    books: [],
    currentPage: 0,
    loading: false,
    noData: false,
    showBackTop: false,
    timer: null,
    lastEvent: 0,
    innerIndex: 0
  },
  onLoad() {
    this.loadData()
  },
  onPageScroll(e: WXPageScrollOption) {
    this.data.lastEvent = e.scrollTop

    if (!this.data.timer) {
      this.data.timer = setTimeout(() => {
        // 直接使用 e.scrollTop 判断只能实现防抖，在滚动停止后 500ms 才会更新 BackTop 的显示状态
        // 宏任务入队时，它的执行上下文也会入队，lastEvent 的当前值会被保存（这不是闭包）
        if (this.data.lastEvent > 800) {
          this.setData({
            showBackTop: true
          })
        } else {
          this.setData({
            showBackTop: false
          })
        }
        // 将计时器变量置为 null 或 undefined 可清除计时器
        this.data.timer = null
      }, 500)
    }
  },
  onReachBottom() {
    this.loadData()
  },
  async loadData() {
    if (this.data.loading) return

    this.setData({
      loading: true
    })

    try {
      const { data } = await getHomeData({ page: this.data.currentPage + 1 })
      // 轮播图只加载一次
      if (this.data.currentPage == 0) {
        this.setData({
          slides: data.slides
        })
      }

      // goods 不为空加载数据，为空显示没有数据了
      if (data.goods.data.length !== 0) {
        this.setData({
          slides: data.slides,
          books: [...this.data.books, ...data.goods.data],
          currentPage: data.goods.current_page,
          loading: false
        })
      } else {
        this.setData({
          loading: false,
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
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 600
      })
    }, 100)
  }
})
