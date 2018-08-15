/*
 * @Methods: CreateFormComponent
 * @Desc: 创建form
 * @Author: djkloop
 * @Date: 2018-08-02 18:20:39
 * @Last Modified by: djkloop
 * @Last Modified time: 2018-08-07 12:09:55
 */

import Logger from '_util_logger'
const logger = Logger.getLogger('CreateFormComponent')

const CreateFormComponentName = 'CreateFormComponentName'

const CreateFormComponent = $$vm => {
  return {
    name: CreateFormComponentName,
    data () {
      return {
        formData: {},
        buttonProps: {},
        trueData: {},
        jsonData: {}
      }
    },
    render () {
      logger.info('render -> ')
      return $$vm.createRender.parse($$vm.vm)
    },
    created () {
      $$vm.init(this)
    },
    methods: {
      changeFormData (field, value) {
        this.$set(this.formData, field, value)
      },
      changeTrueData (field, value) {
        this.$set(this.trueData[field], 'value', value)
      },
      getTrueDataValue (field) {
        return this.trueData[field].value
      },
      getTrueData (field) {
        return this.trueData[field]
      },
      getFormData (field) {
        return this.formData[field]
      },
      removeFormData (field) {
        this.$delete(this.formData, field)
        this.$delete(this.trueData, field)
      },
      changeButtonProps (props) {
        this.$set(this, 'buttonProps', Object.assign(this.buttonProps, props))
      },
      emitItemFunc (field) {
        this.$emit('aaaa')
      },
      setField (field) {
        this.$set(this.formData, field, '')
        this.$set(this.trueData, field, {})
      }
    },
    mounted () {
      Object.keys(this.formData).map((field) => {
        let handler = $$vm.handlers[field]
        handler.model && handler.model(this.getTrueData(field))
        $$vm.addHandlerWatch(handler)
        handler._mounted()
      })
      $$vm.options.mounted && $$vm.options.mounted()
    }
  }
}

export default CreateFormComponent
