const concat = [].concat

const assign = Object.assign

const toString = Object.prototype.toString

const throwIfMissing = (errorMsg = 'Missing parameter') => {
  throw new Error(errorMsg)
}

const isDate = (arg) => toString.call(arg) === '[object Date]'

// 中划线转换驼峰
const toHump = name => {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// 驼峰转中划线
const toLine = (name) => name.replace(/([A-Z])/g, '-$1').toLowerCase()

const isNumeric = n => n !== '' && !isNaN(parseFloat(n)) && isFinite(n)

const isPlainObject = (arg) => toString.call(arg) === '[object Object]'

const isFunction = (arg) => toString.call(arg) === '[object Function]'

const isString = (arg) => toString.call(arg) === '[object String]'

const isArray = Array.isArray

const isElement = (arg) => typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg)

const deepExtend = function (origin, target = {}) {
  let isArr = false
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      let clone = target[key]
      if ((isArr = isArray(clone)) || isPlainObject(clone)) {
        let nst = origin[key] === undefined
        if (isArr) {
          isArr = false
          nst && (origin[key] = [])
        } else {
          nst && (origin[key] = {})
        }
        deepExtend(origin[key], clone)
      } else {
        origin[key] = clone
      }
    }
  }
  return origin
}

const uniqueId = ((() => {
  let id = 0
  return () => id++
})())

const dateFormat = (fmt, date = new Date()) => {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (o[k])
        : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }
}

export {
  concat,
  assign,
  toString,
  throwIfMissing,
  isPlainObject,
  isDate,
  isFunction,
  isString,
  isArray,
  deepExtend,
  isElement,
  uniqueId,
  dateFormat,
  isNumeric,
  toHump,
  toLine
}
