import { inputNumberComponent } from '../components'

const supportComponentList = {
  inputnumber: () => (inputNumberComponent)
}

const getSupportComList = function (sName) {
  if (supportComponentList[sName] === undefined) throw new Error(`${sName} 表单类型不存在`)
  return supportComponentList[sName]
}

export const createItem = (cvm, fieldsObj, ref) => {
  console.log(11111111);
  let component = getSupportComList(fieldsObj.type === undefined ? 'hidden' : fieldsObj.type.toLowerCase())
  let $c = component()
  let $InputNumberVnode = new $c.render(cvm, fieldsObj, ref)
  return $InputNumberVnode
}
