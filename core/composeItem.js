import { createItem } from '../core/common'
import { isFunction, isString } from '_util'

let _instance = null

let vm = null

class ComposeItem {
  constructor (h, ctx) {
    this.$createElement = h
    this.$ctx = ctx
    this.$fields = ctx.props.fields
    this.fieldList = []
  }

  _init (cvm, ref) {
    this.$cvm = cvm
    this.$ref = ref
    let _fields = this.filterFields()
    this.distributeFormItem(_fields)
  }

  /**
   *过滤下没有字段的
   *
   * @returns
   * @memberof ComposeItem
   */
  filterFields () {
    let _fields = this.$fields.slice()
    const filterFields = _fields.filter(_field => _field.field !== void 0)
    return filterFields
  }

  /**
   *表单分发器
   *
   * @param {*} fields
   * @memberof ComposeItem
   */
  distributeFormItem (fields) {
    // 应该直接返回vnode 不能像fromcreate那样
    this.$fields.forEach(field => {
      this.fieldList.push(createItem(this.$cvm, field, this.$ref))
    })
  }

  getComposeItem () {
    return this.fieldList
  }

  make (nodeName, data, VNodeFn) {
    if (isString(data)) data = { domProps: { innerHTML: data } }
    let Node = this.$createElement(nodeName, data, this.getVNode(VNodeFn))
    if (vm !== null) { Node.context = vm }
    return Node
  }
  getVNode (VNode) {
    return isFunction(VNode) ? VNode() : VNode
  }
}

ComposeItem.instance = (h, ctx) => {
  if (_instance instanceof ComposeItem === false) { _instance = new ComposeItem(h, ctx) }
  return _instance
}

ComposeItem.setVm = ($vm) => {
  vm = $vm
}
ComposeItem.clearVm = () => {
  vm = null
}

const nodes = {
  modal: 'Modal',
  progress: 'i-progress',
  button: 'i-button',
  icon: 'Icon',
  span: 'span',
  slider: 'Slider',
  rate: 'Rate',
  upload: 'Upload',
  cascader: 'Cascader',
  colorPicker: 'Color-Picker',
  timePicker: 'Time-Picker',
  datePicker: 'Date-Picker',
  switch: 'i-switch',
  option: 'i-option',
  select: 'i-select',
  checkbox: 'Checkbox',
  checkboxGroup: 'Checkbox-Group',
  radio: 'Radio',
  radioGroup: 'Radio-Group',
  inputNumber: 'Input-Number',
  input: 'i-input',
  formItem: 'Form-Item',
  form: 'i-form',
  col: 'i-col',
  row: 'row'
}

// 在原型链上构建
Object.keys(nodes).forEach((k) => {
  ComposeItem.prototype[k] = function (data, VNodeFn) {
    return this.make(nodes[k], data, VNodeFn)
  }
})

export default ComposeItem
