<template>
  <Card>
    <div id="wrapper">
      <create-vue-form ref="form" :fields="data" @emit-ok="ok" @emit-os="os" />
    </div>
  </Card>
</template>
<script>
import CreateVueForm from '@/vue-form-layout-create'

export default {
  name: 'level_2_3',
  data () {
    return {
      data: [
        {
          type: 'switch', // 必填!
          // label名称
          label: '是否上架', // 必填!
          // 字段名称
          field: 'is_show', // 必填!
          // input值
          value: 1,
          props: {
            // 开关的尺寸，可选值为large、small、default或者不写。建议开关如果使用了2个汉字的文字，使用 large。
            size: 'large',
            // 禁用开关
            disabled: false,
            // 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
            trueValue: '1',
            // 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
            falseValue: '0'
          },
          slot: {
            // 自定义显示打开时的内容
            open: '上架',
            // 自定义显示关闭时的内容
            close: '下架'
          },
          event: {
            // 开关变化时触发，返回当前的状态 0 | 1
            change: 'emitOk'
          },
          validate: []
        },
        {
          type: 'inputNumber',
          label: '项目AAAAA',
          value: 99,
          field: 'good_name2',
          col: {
            span: 6
          },
          event: {
            change: 'emitOk'
          }
        },
        {
          type: 'inputNumber',
          label: '项目AAAAA',
          value: 199,
          field: 'good_name',
          col: {
            span: 6
          },
          event: {
            change: 'emitOs'
          }
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    isOpTimes() {

    },
    onFilter() {

    },
    init () {
    },
    ok (v, f) {
      console.log(typeof v, f)
      this.$refs.form.$CreateGlobalApi.removeField('good_name')
    },
    os (v, field) {
      console.log(v, field)
    }
  }
}
</script>
