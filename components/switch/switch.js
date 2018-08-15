/*
 * @Methods: TransFormInputNumber
 * @Desc: 生成inputNumberComponent
 * @Author: djkloop
 * @Date: 2018-08-02 11:19:36
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-15 17:12:25
 */
import handlerFactory from '../../core/handler'
import renderFactory from '../../core/render'
import builderFactory from '../../core/builder'

const handler = handlerFactory({
  // 覆盖掉原型上的方法
  // 根据当前的类型做一些值得特殊处理
  init (value) {
    if (this.rule.slot === void 0) this.rule.slot = {}
  }
})

// 渲染自己 然后 在拿到元素上需要的属性
// 最后在获取值
// return this -> 链式调用
const render = renderFactory({
  parse () {
    let { slot } = this.handler.rule
    this.propsData = this.inputProps().scopedSlots({
      open: () => slot.open,
      close: () => slot.close
    }).get()
    return [this.cvm.switch(this.propsData)]
  }
})

// 是给返回出来的实例挂载一个快速构建builder方法吧猜测...
const builder = builderFactory('switch', ['slot', 'props', 'event', 'validate'])

const switchComponent = {
  handler,
  render,
  builder
}

export default switchComponent
