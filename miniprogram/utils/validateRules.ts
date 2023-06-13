interface validateArgs {
  that: any
  value: string
  validateVal?: string
  key: string
  label: string
  msg?: string
  min?: number
  max?: number
}

/**
 * 不为空返回 true，为空返回 false
 * @param that 当前 Page 的 This
 * @param value 被校验的值
 * @param key 被替换的校验失败提示的 key
 * @param label 为空的提示 label
 */
const notNullRule = function nullValidate({ that, value, key, label }: validateArgs): boolean {
  value = value.replace(/\s+/g, '')
  if (value !== '') {
    that.setData({ [key]: '' })
    return true
  }

  that.setData({ [key]: `${label}不能为空` })
  return false
}

const identicalRule = function identicalValidate({
  that,
  value,
  validateVal,
  key,
  label,
  msg
}: validateArgs): boolean {
  if (!notNullRule({ that, value: validateVal ?? '', key, label })) return false

  if (value === validateVal) {
    that.setData({ [key]: '' })
    return true
  }

  that.setData({ [key]: msg })
  return false
}

/**
 * 昵称校验，包含字母大小写、数字、下划线、短横线。
 * 校验成功返回 true，失败返回 false
 * @param msg 校验失败的提示
 * @param min 昵称最小位数
 * @param max 昵称最大位数
 */
const regExpRule = function regExpValidate(
  regExp: RegExp,
  {
    that,
    value,
    key,
    label,
    msg
  }: validateArgs): boolean {
  if (!notNullRule({ that, value, key, label })) return false

  if (regExp.test(value)) {
    that.setData({ [key]: '' })
    return true
  }

  that.setData({ [key]: msg })
  return false
}

const nameRule = (args: validateArgs) => {
  const min = args?.min ?? 4
  const max = args?.max ?? 8
  const regExp = new RegExp(`^[a-zA-Z0-9_-]{${min},${max}}$`)
  return regExpRule(regExp, args)
}

const emailRule = (args: validateArgs) => {
  const regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return regExpRule(regExp, args)
}

const passwordRule = (args: validateArgs) => {
  const min = args?.min ?? 8
  const max = args?.max ?? 16
  const regExp = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{${min},${max}}$`)
  return regExpRule(regExp, args)
}

const phoneRule = (args: validateArgs) => {
  const regExp = new RegExp(`^(13[0-9]|14[57]|15[012356789]|16[56]|17[0135678]|18[0-9]|19[89])\\d{8}$`)
  return regExpRule(regExp, args)
}

export {
  phoneRule,
  notNullRule,
  nameRule,
  emailRule,
  passwordRule,
  identicalRule
}