import CreateVueFormLayout from '../../core/createVueFormLayout'
import { uniqueId } from '../../util'
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
    _getTrueDataValue (field) {
      return this.trueData[field].value
    },
    _changeTrueData (field, value) {
      this.$set(this.trueData[field], 'value', value)
    },
    _getTrueData (field) {
      return this.trueData[field]
    },
    _changeFormData (field, value) {
      this.$set(this.formData, field, value)
    },
    _removeRender (field) {
      delete this.renders[field]
      this.renderSort.splice(this.renderSort.indexOf(field), 1)
      console.log(this)
    },
    _removeFormData (field) {
      this.$delete(this.formData, field)
      this.$delete(this.trueData, field)
    },
    __init__ (cVm, { fieldList, handlers, validate, options, $CreateGlobalApi }) {
      this.finish = true
      this.unique = uniqueId()
      this.options = options
      this.fromRefName = `create-vue-form-${this.unique}`
      this.renderSort = fieldList
      this.renders = this.renderSort.reduce((initial, field) => {
        initial[field] = handlers[field].render
        return initial
      }, {})
      this.form = {
        model: this.formData,
        rules: validate
      }
      this.$CreateGlobalApi = $CreateGlobalApi
      this.cvm = Creator.instance(this.$createElement)
      this.props = Props.instance()
      // 数据监听 -> v-model
      Object.keys(this.formData).map((field) => {
        let handler = cVm.handlers[field]
        handler.model && handler.model(this._getTrueData(field))
        cVm.addHandlerWatch(handler)
        handler._mounted()
      })
      cVm.options.mounted && cVm.options.mounted()
      return this
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
      return this.cvm.col({ props: rule.col, style: rule.style }, [this.cvm.formItem(propsData, VNodeFn)])
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
      console.log(this.renderSort, ' render')
      let childVnode = this.renderSort.map(field => {
        let render = this.renders[field], { key, type } = render.handler
        if (type !== 'hidden') {
          return this.makeFormItem(render.handler, render.parse(), `fItem${key}${unique}`)
        }
      })
      let propsData = this.props.props(Object.assign({}, this.options.form, this.form)).ref(this.fromRefName).class(`crate-vue-form-${unique}`, true).key(unique).get()
      return this.finish ? this.cvm.form(propsData, [this.cvm.row({ props: this.options.row || {} }, childVnode)]) : h('span', '组件没有加载完成')
    }
  },
  render (h) {
    return this.__parse__render(h)
  }
})

export default $CreateForm
