/*
 * @Methods: render
 * @Desc: 返回一个vnode
 * @Author: djkloop
 * @Date: 2018-08-02 11:22:32
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-14 16:33:49
 */
import props from './props'
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
  constructor (ctx, fields) {
    console.log(ctx)
    this.$cvm = ctx.$cvm
    this.fields = fields
    this.props = props.instance()
    this.unique = uniqueId()
  }

  parse () {
    throw new Error('请实现parse方法')
  }
  inputProps () {
    console.log(this.props)
    console.log(this.fields)
    console.log(1111, ' 我是对的')
    let { col } = this.fields
    console.log(col)
    // 嵌套一个
    return ''
  }
}

export default renderFactory
