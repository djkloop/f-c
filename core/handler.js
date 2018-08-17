/*
 * @Methods: undefined
 * @Desc:
 * @Author: djkloop
 * @Date: 2018-08-15 12:09:33
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-16 17:48:09
 */
import { isArray, uniqueId, isNumeric, isString, toLine } from '../util'

class Handler {
  constructor (vm, { isShow = true, model, field, type, label = '', opts = [], props = {}, validate = [], event = {}, value = '', slot = {}, col = { span: 12 } }) {
    field = field.toString()
    this.type = type
    this.model = model
    this.value = value
    if (isNumeric(col)) {
      col = {
        span: col
      }
    } else if (col === void 0) {
      col.span = 12
    }

    this.rule = {
      title: label,
      opts,
      props,
      slot,
      style: isShow ? {} : { display: 'none' },
      col,
      validate: isArray(validate) ? validate : [validate],
      event: Object.keys(event).reduce((initial, eventName) => {
        initial[`on-${eventName}`] = isString(event[eventName]) ? v => { let res = []; res.push(field); res.unshift(v); this.vm.$emit(toLine(event[eventName]), ...res) } : event[eventName]
        return initial
      }, {})
    }

    this.field = field
    this.vm = vm
    this.unique = uniqueId()
    this.itemRefName = field + '_' + this.unique
    this.el = {}
  }

  getValue () {
    return this.vm._getTrueDataValue(this.field)
  }

  toParseValue (v) {
    return v.toString()
  }

  toTrueValue (pV) {
    return pV
  }

  setValue (value) {
    this.vm._changeTrueData(this.field, value)
  }

  setParseValue (parseValue) {
    this.setValue(this.toTrueValue(parseValue))
  }

  watchTrueValue (n) {
    this.vm._changeFormData(this.field, this.toParseValue(n.value))
  }

  mounted () {

  }

  _mounted () {
    this.el = this.vm.$refs[this.itemRefName]
    this.mounted()
  }
}

const handlerFactory = function (prototypeExtend = {}) {
  // 建一个空的class继承Handler
  class $H extends Handler { }
  Object.assign($H.prototype, prototypeExtend)
  return $H
}

export default handlerFactory
