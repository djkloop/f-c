/*
 * @Methods: render
 * @Desc: 返回一个vnode
 * @Author: djkloop
 * @Date: 2018-08-02 11:22:32
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-15 15:32:20
 */
import Creator from './Creator'
import Props from './props'
import { uniqueId } from '_util'
import Logger from '_util_logger'
const logger = Logger.getLogger('factory-render')

logger.warn('start')
const renderFactory = prototypeExtend => {
  class $R extends Render { }
  Object.assign($R.prototype, prototypeExtend)
  return $R
}

class Render {
  constructor (vm, handler, opts = {}) {
    this.handler = handler
    this.options = opts
    this.vm = vm
    this.cvm = Creator.instance(vm.$createElement)
    this.event = handler.rule.event
    this.props = Props.instance()
  }

  parse () {
    throw new Error('请实现parse方法')
  }
  inputProps () {
    // 从上层的handler过来的
    let { itemRefName, unique, field, rule: { props } } = this.handler
    // 嵌套一个
    return this.props.props(Object.assign(props, { model: `formData.${field}`, value: this.vm.formData[field], eleId: itemRefName }))
      .ref(itemRefName).key(`f-item-${unique}`).on(this.event).on('input', v => {
        this.vm.$emit('input', v)
        this.vm.$set(this.vm.formData, field, v)
      })
  }
}

export default renderFactory
