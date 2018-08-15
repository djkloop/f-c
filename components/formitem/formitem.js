import { uniqueId } from '_util'
import Logger from '_util_logger'
const logger = Logger.getLogger('CreateFormItem')

const CreateFormComponentName = 'CreateFormItem'
logger.info('创建')
const $CreateFormItemFactory = (h, rules, vm) => {
  return new CreateItem(h, rules, vm)
}

class CreateItem {
  constructor (h, rules, vm) {
    this.rules = rules
    this.h = h
    this.init(vm)
  }

  init (vm) {
    console.log(vm)
    this.rules.filter(rule => rule.field !== void 0).forEach(rule => {

    })
  }

  checkRule (rule) {}
}

export default $CreateFormItemFactory

// name: CreateFormComponentName,
//   props: {
//     rules: Array
//   },
//   data () {
//     return {
//       formData: {},
//       buttonProps: {},
//       trueData: {},
//       jsonData: {}
//     }
//   },
//   render (h) {
//     console.log(h)
//     return h('Form', '1')
//   },
//   created () {
//     console.log(this)
//   }
