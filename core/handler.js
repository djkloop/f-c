/*
 * @Methods: undefined
 * @Desc: 
 * @Author: djkloop
 * @Date: 2018-08-15 12:09:33
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-15 15:34:37
 */
import { isArray, uniqueId, isNumeric } from '_util'

class Handler {
  constructor (vm, { model, field, type, label = '', opts = [], props = {}, validate = [], event = {}, value = '', slot = {}, col = { span: 12 } }) {
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
      col,
      validate: isArray(validate) ? validate : [validate],
      event: Object.keys(event).reduce((initial, eventName) => {
        initial[`on-${eventName}`] = event[eventName]
        return initial
      }, {})
    }

    this.field = field
    this.vm = vm
    this.unique = uniqueId()
    this.itemRefName = field + '_' + this.unique
    this.el = {}
  }

  toParseValue (v) {
    return v.toString()
  }

  toTrueValue (pV) {
    return pV
  }
}

const handlerFactory = function (prototypeExtend = {}) {
  // 建一个空的class继承Handler
  class $H extends Handler { }
  Object.assign($H.prototype, prototypeExtend)
  return $H
}

export default handlerFactory
