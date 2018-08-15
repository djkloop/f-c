import { inputNumberComponent } from '../components'

const supportComponentList = {
  inputnumber: () => inputNumberComponent
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
