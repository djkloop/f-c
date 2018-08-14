import { $CreateForm } from './components'

export let __Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  __Vue = Vue
  Vue.component('CreateVueForm', $CreateForm())
}
