// pages/addressDetail/addressDetail.ts
import { areaList } from '../../miniprogram_npm/@vant/area-data/data'
import { notNullRule, phoneRule } from '../../utils/validateRules'
import { addAddress } from '../../apis/addresses'

type Area = {
  province: string
  city: string
  county: string
}
interface PageData {
  name: string
  phone: string
  area: Area | null
  areaValue: string
  areaDetail: string
  nameErrMessage: string
  areaValueErrMessage: string
  phoneErrMessage: string
  areaDetailErrMessage: string
  showAddressSelect: boolean
  checked: 1 | 0
  areaList: {}
}
interface PageMethods {
  openAddressPopover(): void
  closeAddressPopover(): void
  confirm(data: VantEvent<{ index: number[], values: { code: string, name: string }[] }>): void
  onChange(event: VantEvent<boolean>): void
  nameRule(): boolean
  areaValueRule(): boolean
  phoneRule(): boolean
  areaDetailRule(): boolean
  save(): void
}

Page<PageData, PageMethods>({
  data: {
    name: '',
    phone: '',
    area: null,
    areaValue: '',
    areaDetail: '',
    nameErrMessage: '',
    areaValueErrMessage: '',
    phoneErrMessage: '',
    areaDetailErrMessage: '',
    showAddressSelect: false,
    checked: 1,
    areaList
  },
  onLoad() {

  },
  onShow() {

  },
  openAddressPopover: function handleToShowAddressSelectPopover() {
    this.setData({
      showAddressSelect: true
    })
  },
  closeAddressPopover: function handleToHiddenAddressSelectPopover() {
    this.setData({
      showAddressSelect: false
    })
  },
  confirm: function handleToSetArea(data) {
    const { values } = data.detail
    const area: Area = {
      province: values[0].name,
      city: values[1].name,
      county: `${values[2].name}-${values[2].code}`
    }
    this.setData({
      areaValue: `${values[0].name}/${values[1].name}/${values[2].name}`,
      area
    })
    this.areaValueRule()
    this.closeAddressPopover()
  },
  onChange: function handleOnSwitchChange({ detail }: VantEvent<boolean>) {
    this.setData({ checked: detail ? 1 : 0 })
  },
  nameRule: function nameValidate() {
    return notNullRule({
      that: this,
      value: this.data.name,
      key: 'nameErrMessage',
      label: '姓名'
    })
  },
  areaValueRule: function areaValidate() {
    return notNullRule({
      that: this,
      value: this.data.areaValue,
      key: 'areaValueErrMessage',
      label: '地区'
    })
  },
  phoneRule: function phoneValidate() {
    return phoneRule({
      that: this,
      value: this.data.phone,
      key: 'phoneErrMessage',
      label: '电话',
      msg: '电话格式不正确'
    })
  },
  areaDetailRule: function areaDetailValidate() {
    return notNullRule({
      that: this,
      value: this.data.areaDetail,
      key: 'areaDetailErrMessage',
      label: '详细地址'
    })
  },
  save: async function handleToSaveAddress() {
    const validationRes = [
      this.nameRule(),
      this.phoneRule(),
      this.areaValueRule(),
      this.areaDetailRule()
    ]
    if (validationRes.some(res => !res)) return

    try {
      const data: AddressAddData = {
        name: this.data.name,
        address: this.data.areaDetail,
        phone: this.data.phone,
        is_default: this.data.checked,
        ...this.data.area as Area
      }
      const res = await addAddress(data)

      if (res.statusCode !== 201) return

      wx.showToast({
        title: '保存成功',
        mask: false,
        duration: 1000
      })
    } catch (error) {

    }
  }
})