import ComposeItem from '../../core/composeItem'
// import { uniqueId } from '_util'
import Logger from '_util_logger'
const logger = Logger.getLogger('CreateElement')
const CreateFormComponentName = 'CreateVueForm'
logger.info('创建')

const $CreateForm = _ => ({
  name: CreateFormComponentName,
  functional: true,
  render (h, ctx) {
    // 拿到构造器
    let cvm = ComposeItem.instance(h, ctx)
    ctx.cvm = cvm
    ctx.cvm._init(ctx.cvm, ctx.props.formName)
    // render child vNode
    function itemsRender () {
      let items = ctx.cvm.getComposeItem()
      return items
    }

    // back child vNode
    let items = itemsRender()

    return ctx.cvm.form({
      class: ctx.data.staticStyle,
      style: ctx.data.staticStyle,
      props: ctx.props
    },
    [ctx.cvm.row({props: {type: 'flex'}}, [items])]
    )
  }
})

export default $CreateForm
