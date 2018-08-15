import merge from 'lodash.merge'
import { getConfig, createItem } from './common'
import { Builder } from './builder'
import { assert } from '../util/warn'

class CreateVueFormLayout {
  constructor (vm, fields) {
    let options = merge(merge({}, getConfig()), fields)
    this.vm = vm
    this.fields = fields
    this.rules = Array.isArray(fields) ? fields : []
    this.fieldList = []
    this.options = options
    this.handlers = {}
    this.createRender = {}
    this.formData = {}
    this.validate = {}
    this.trueData = {}
    this.fieldList = []
  }

  init () {
    this.fields.forEach((field, index) => {
      if (field instanceof Builder) {
        this.fields[index] = field.getRule()
      }
    })
    this.fields.filter(field => field.field !== void 0).forEach(field => {
      // type 转小写
      field = this.checkRule(field)
      let $H = createItem(this.vm, field, this.options)
      if (this.fieldList.indexOf($H.field) === -1) {
        this.setHandler($H)
        this.fieldList.push($H.field)
      } else {
        assert(false, '字段重复...')
      }
    })
    this.vm.$set(this.vm, 'formData', this.formData)
    this.vm.$set(this.vm, 'trueData', this.trueData)
    this.vm.$set(this.vm, 'buttonProps', this.options.submitBtn)
    // 创建form
    this.vm.__init__(this)
  }

  setHandler ($H) {
    // 根据每一个返回的handler实例
    // 生成需要的值
    let rule = $H.rule
    let field = $H.field
    this.handlers[field] = $H
    this.formData[field] = $H.toParseValue($H.value)
    this.validate[field] = rule.validate
    this.trueData[field] = {
      value: $H.toTrueValue(this.formData[field]),
      rule: $H.rule
    }
    // console.log(this.formData, 'formData')
    // console.log(this.handlers, 'handlers')
    // console.log(this.validate, 'validate')
    // console.log(this.trueData, 'trueData')
  }

  checkRule (field) {
    field.type = field.type === undefined ? 'hidden' : field.type.toLowerCase()
    if (!field.field) field.field = ''
    return field
  }
}

CreateVueFormLayout._init = (vm, fields) => new CreateVueFormLayout(vm, fields)

export default CreateVueFormLayout
