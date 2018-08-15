import { isFunction, isString } from '_util'

let _instance = null

let vm = null

class Creator {
  constructor (h) {
    this.$h = h
  }

  make (nodeName, data, VNodeFn) {
    if (isString(data)) data = { domProps: { innerHTML: data } }
    let Node = this.$h(nodeName, data, this.getVNode(VNodeFn))
    if (vm !== null) { Node.context = vm }
    return Node
  }

  getVNode (VNode) {
    return isFunction(VNode) ? VNode() : VNode
  }
}

Creator.instance = h => {
  if (_instance instanceof Creator === false) { _instance = new Creator(h) }
  return _instance
}

Creator.setVm = ($vm) => {
  vm = $vm
}
Creator.clearVm = () => {
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
  Creator.prototype[k] = function (data, VNodeFn) {
    return this.make(nodes[k], data, VNodeFn)
  }
})

export default Creator
