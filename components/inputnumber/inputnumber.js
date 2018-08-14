/*
 * @Methods: TransFormInputNumber
 * @Desc: 生成inputNumberComponent
 * @Author: djkloop
 * @Date: 2018-08-02 11:19:36
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-14 18:45:04
 */
// import handlerFactory from '../factory/handler'
// const renderProps = renderFactory({
//   parse () {
//     return this.$cvm.col({ props: this.fields.col }, [this.$cvm.inputNumber(this.inputProps())])
//   }
// })

// 1. 关于event 因为每一个组件触发的事件都不一样

class BaseProps {

  constructor (extendProps, ctx) {
    this.props = this._initData(extendProps, ctx)
  }

  _initData (extendProps, ctx) {
    let { field, value } = extendProps
    let res = {}
    const baseProps = {
      class: {},
      style: {},
      attrs: {},
      props: {},
      domProps: {},
      on: {},
      nativeOn: {},
      directives: [],
      scopedSlots: {},
      slot: undefined,
      key: undefined,
      ref: undefined
    }

    let props = {
      value
    }

    console.log(ctx.props, extendProps)

    if (extendProps.event) {
      baseProps.on['on-change'] = (e) => ctx.props[extendProps.event](e, field)
    }
    const extndsProps = Object.assign(res, baseProps, { props })
    return extndsProps
  }
}

BaseProps.instance = (extendProps, ctx) => {
  return new BaseProps(extendProps, ctx)
}

const inputPropsFactory = (fields, ref, ctx) => {
  const composeInputProps = BaseProps.instance(fields, ctx)
  // let { event, value } = fields
  // let composeInputProps = {}
  return composeInputProps
}

const render = (ctx, fields, ref) => {
  let { $cvm, $ctx } = ctx
  let { label } = fields
  let formItemProps = { label }
  let inputProps = inputPropsFactory(fields, ref, $ctx)
  console.log(inputProps)
  let col = fields.col || { span: 12 } // 先设置布局
  return $cvm.col({ props: col }, [$cvm.formItem({ props: formItemProps }, [
    $cvm.inputNumber(inputProps.props)
  ])])
}

const inputNumberComponent = { render }
export default inputNumberComponent
