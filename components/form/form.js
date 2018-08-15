import CreateFormComponent from '../../core/CreateFormComponent'
import CreateVueFormLayout from '../../core/createVueFormLayout'
import { uniqueId } from '_util'
import Creator from '../../core/Creator'
import Props from '../../core/props'

const CreateFormComponentName = 'CreateVueForm'

const $CreateForm = vm => ({
  name: CreateFormComponentName,
  props: {
    fields: Array
  },
  data () {
    return {
      formData: {},
      buttonProps: {},
      trueData: {},
      jsonData: {}
    }
  },
  created () {
    let $Create = CreateVueFormLayout._init(this, this.fields)
    $Create.init()
  },
  methods: {
    component () {
      return CreateFormComponent(this)
    },
    __init__ ({fieldList, handlers, validate, options}) {
      this.finish = true
      this.unique = uniqueId()
      this.options = options
      this.fromRefName = `create-vue-form-${this.unique}`
      this.renderSort = fieldList
      this.renders = this.renderSort.reduce((initial, field) => {
        initial[field] = handlers[field]
        return initial
      }, {})
      this.form = {
        model: this.formData,
        rules: validate
      }

      this.cvm = Creator.instance(this.$createElement)
      this.props = Props.instance()

      console.log(this.cvm, this.props)
    },
    makeFormItem ({ rule, fRefName, unique, field }, VNodeFn) {
      let propsData = this.props.props({
        prop: field,
        label: rule.title,
        labelFor: fRefName,
        rules: rule.validate,
        class: `${unique}-item ${(rule.custom && rule.custom.class) || ''}`,
        labelWidth: rule.col.labelWidth,
        required: rule.props.required
      }).key(unique).get()
      return this.cvm.col({ props: rule.col }, [this.cvm.formItem(propsData, VNodeFn)])
    },
    __parse__render (h) {
      Creator.setVm(this)
      let unique = this.unique
      // 格式化props 返回给 iView 的 Form
      // 1. 给props
      // 2. 设置ref
      // 3. 设置class
      // 4. 设置key
      // 5. 最后获取object
      let propsData = this.props.props(Object.assign({}, this.options.form, this.form)).ref(this.fromRefName).class(`crate-vue-form-${unique}`, true).key(unique).get()
      console.log(propsData)
      return this.finish ? this.cvm.form(propsData, 'good') : h('span', '组件没有加载完成')
    }
  },
  render (h) {
    return this.__parse__render(h)
    // // 拿到构造器
    // let cvm = ComposeItem.instance(h, ctx)
    // ctx.cvm = cvm
    // ctx.cvm._init(ctx.cvm, ctx.props.formName)
    // // render child vNode
    // function itemsRender () {
    //   let items = ctx.cvm.getComposeItem()
    //   return items
    // }

    // // back child vNode
    // let items = itemsRender()

    // return ctx.cvm.form({
    //   class: ctx.data.staticStyle,
    //   style: ctx.data.staticStyle,
    //   props: ctx.props
    // },
    // [ctx.cvm.row({props: {type: 'flex'}}, [items])]
    // )
  }
})

export default $CreateForm
