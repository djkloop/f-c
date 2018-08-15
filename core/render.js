/*
 * @Methods: render
 * @Desc: 返回一个vnode
 * @Author: djkloop
 * @Date: 2018-08-02 11:22:32
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-15 12:44:49
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
    console.log(this.props)
    console.log(this.options)
    console.log(1111, ' 我是对的')
    // 嵌套一个
    return ''
  }
}

export default renderFactory
