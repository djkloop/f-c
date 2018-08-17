import { inputNumberComponent, switchComponent } from '../components'
import { assert, warn } from '../util/warn'

const supportComponentList = {
  inputnumber: () => inputNumberComponent,
  switch: () => switchComponent
}

const getSupportComList = function (sName) {
  if (supportComponentList[sName] === undefined) throw new Error(`${sName} 表单类型不存在`)
  return supportComponentList[sName]
}
// 生成一个item vue实例
export const createItem = (vm, fieldsObj, opts) => {
  let component = getSupportComList(fieldsObj.type)
  let $component = component()
  let $H = new $component.handler(vm, fieldsObj)
  $H.render = new $component.render(vm, $H, opts)
  return $H
}

export const getConfig = _ => ({
  el: null,
  form: {
    inline: true,
    labelPosition: 'right',
    labelWidth: 125,
    showMessage: true,
    autocomplete: 'off'
  },
  upload: {
    beforeUpload: () => { },
    onProgress: (event, file, fileList) => { },
    onSuccess: (response, file, fileList) => {
    },
    onError: (errors, file, fileList) => { },
    onPreview: (file) => { },
    onRemove: (file, fileList) => { },
    onFormatError: (file, fileList) => { },
    onExceededSize: (file, fileList) => { },
    handleIcon: 'ios-eye-outline',
    allowRemove: true
  },
  onSubmit: formData => { },
  submitBtn: {
    type: 'primary',
    size: 'large',
    shape: undefined,
    long: true,
    htmlType: 'button',
    disabled: false,
    icon: 'ios-upload',
    innerText: '提交',
    loading: false
  },
  mounted: () => { }
})

export const getGlobalApi = createVueFormLayoutVm => {
  let vm = createVueFormLayoutVm.vm
  console.log(createVueFormLayoutVm)
  return {
    /**
     * 返回当前form的实例
     *
     * @returns
     */
    formData () {
      let data = {}
      createVueFormLayoutVm.toFields().map(field => {
        field = field.toString()
        data[field] = createVueFormLayoutVm.handlers[field].getValue()
      })
      return data
    },
    /**
     *返回当前 form 表单中的某个字段的 value
     *
     * @param {*} field
     * @returns
     */
    getValue (field) {
      // 获取值
      field = field.toString()
      let handler = createVueFormLayoutVm.handlers[field]
      if (handler === void 0) {
        warn(false, `${field} 字段不存在`)
      } else {
        return handler.getValue()
      }
    },
    /**
     * 修改指定字段的某个值
     *
     * @param {string} field
     * @param {any} value
     */
    changeFieldValue (field, value) {
      field = field.toString()
      let handler = createVueFormLayoutVm.handlers[field]
      if (handler === void 0) {
        assert(false, `${field} 字段不存在`)
      } else {
        handler.setValue(value)
      }
    },
    /**
     * 删除指定字段
     *
     * @param {*} field
     */
    removeField (field) {
      createVueFormLayoutVm.removeField(field.toString())
    }
  }
}
