/*
 * @Methods: builder
 * @Desc: 用来快速构造表单元素
 * @Author: djkloop
 * @Date: 2018-08-02 14:27:29
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-15 17:52:00
 */
import { isArray } from '../util'
const baseRule = () => {
  return {
    props: {},
    event: {},
    validate: [],
    options: [],
    slot: {},
    col: {}
  }
}

// 函数柯里化返回一个
const builderFactory = (type, attrs) => {
  return function $B (title, field, value = '') {
    let rule = baseRule()
    rule.type = type
    rule.title = title
    rule.value = value
    rule.field = field
    return new Builder(rule, attrs)
  }
}

const attrHandlers = {}

const objAttrs = ['props', 'event', 'slot', 'col']

objAttrs.forEach((attr) => {
  attrHandlers[attr] = function (opt) {
    this.rule[attr] = Object.assign(this.rule[attr], opt)
    return this
  }
})

const arrAttrs = ['validate', 'options']

arrAttrs.forEach((attr) => {
  attrHandlers[attr] = function (opt) {
    if (!isArray(opt)) opt = [opt]
    this.rule[attr] = this.rule[attr].concat(opt)
    return this
  }
})

class Builder {
  constructor (rule, attrs) {
    this.rule = rule
    attrs.push('col')
    attrs.forEach(attr => {
      this[attr] = attrHandlers[attr]
    })
  }

  getRule () {
    return this.rule
  }

  setValue (value) {
    this.rule.value = value
    return this
  }

  model (model, field) {
    if (!field) field = this.rule.field
    this.rule.model = v => {
      model[field] = v
    }
  }
}

export default builderFactory

export {
  Builder
}
