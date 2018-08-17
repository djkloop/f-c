import merge from 'lodash.merge'
import { getConfig, createItem, getGlobalApi } from './common'
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
    // TODO: 拿到全局api
    this.$CreateGlobalApi = getGlobalApi(this)
    this.vm.$set(this.vm, 'formData', this.formData)
    this.vm.$set(this.vm, 'trueData', this.trueData)
    this.vm.$set(this.vm, 'buttonProps', this.options.submitBtn)
    // 创建form
    this.createRender = this.vm.__init__(this, this)
  }

  /**
   * 返回所有字段
   *
   * @returns Array
   * @memberof CreateVueFormLayout
   */
  toFields () {
    return Object.keys(this.formData)
  }

  /**
   * 删除指定字段
   *
   * @param {*} field
   * @memberof CreateVueFormLayout
   */
  removeField (field) {
    if (this.handlers[field] === undefined) { throw new Error(`${field}字段不存在`) }

    this.vm._removeFormData(field)
    delete this.handlers[field]
    for (let index = 0; index < this.fields.length; index++) {
      const element = this.fields[index]
      if (element.field === field) {
        this.fields.splice(index, 1)
        delete this.options[index]
      }
    }
    delete this.validate[field]
    delete this.formData[field]
    delete this.trueData[field]
    this.createRender._removeRender(field)
    console.log(this, this.vm)
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

  addHandlerWatch (handler) {
    let field = handler.field
    let unWatch = this.vm.$watch(`formData.${field}`, (n, o) => {
      if (this.formData[field]) {
        if (handler !== undefined) {
          handler.setParseValue(n)
        } else {
          unWatch()
        }
      }
    }, { deep: true })
    let unWatch2 = this.vm.$watch(`trueData.${field}`, (n, o) => {
      if (this.formData[field]) {
        if (handler !== undefined) {
          let json = JSON.stringify(n)
          if (this.vm.jsonData[field] !== json) {
            this.vm.jsonData[field] = json
            handler.model && handler.model(this.vm._getTrueData(field))
            handler.watchTrueValue(n)
          }
        } else {
          unWatch2()
        }
      }
    }, { deep: true })
  }

  checkRule (field) {
    field.type = field.type === undefined ? 'hidden' : field.type.toLowerCase()
    if (!field.field) field.field = ''
    return field
  }
}

CreateVueFormLayout._init = (vm, fields) => new CreateVueFormLayout(vm, fields)

export default CreateVueFormLayout
