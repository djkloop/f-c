import { install } from './install'
import createVueFormLayout from './core/createVueFormLayout'
import { inBrowser } from './util'

const __VERSION__ = '0.0.1'

// 挂全局api函数
class CreateVueForm {
  constructor (vm) {
    this.vm = vm
    this._init()
  }

  _init () {
    console.log(this.vm)
  }
}

CreateVueForm.install = install
CreateVueForm.version = __VERSION__

export default CreateVueForm

if (inBrowser && window.Vue) {
  window.Vue.use(CreateVueForm)
}
