<script>
  import { baseMixin } from '../components/mixins/base-mixins'
  import { Group, XInput, Cell, PopupRadio, Divider, XButton } from 'vux'
  import { getPropValue } from '../utils/common-utils'
  import {
    groupGen, getUnfilledRequiredField, getRequiredFields,
    addInvalidateFields
  } from '../utils/fields-dealing-utils'
  let noObjEmit = false

  export default {
    render: function (createElement) {
      let self = this
      let t = groupGen(createElement, this.localFieldsSetting, self.localObj)
      return createElement(
        'group',
        [
          ...t,
          createElement('span', {}, getPropValue(this.localObj, 'name').prop),
          createElement('span', {}, getPropValue(this.localObj, 'idNumber').prop),
          createElement('span', {}, getPropValue(this.localObj, 'mainJob').prop),
          createElement('span', {}, getPropValue(this.localObj, 'bankCode').prop),
//          createElement('x-button', {
//            props: {
//              type: 'primary'
//            }
//          }, '测试按钮'),
        ]
      )
    },
    props: ['groupTitle', 'fieldsSetting', 'value'],
    components: {
      Group, XButton,
      XInput, Cell, PopupRadio, Divider
    },
    mixins: [baseMixin],
    data() {
      return {
        title: '测试输入框',
        inputModel1: '输入1',
        inputModel2: '输入2',
        localObj: {},
        localFieldsSetting: this.clone(this.fieldsSetting)
      }
    },
    created() {
      this.initFields()
    },
    watch: {
      value(v) {
        this.localObj = this.clone(this.value)
        noObjEmit = true
      },
      fieldsSetting: {
        handler(v) {
          this.localFieldsSetting = this.clone(this.fieldsSetting)
        },
        deep: true
      },
      localObj: {
        handler(v) {
          if (noObjEmit) {
            noObjEmit = false
          } else {
//            console.log('localObj = ', v)
            if (Object.keys(v).length > 0) {
              this.syncAutoFills(v)
              this.syncInvalidFields()
            }
            this.$emit('input', v)
          }
        },
        deep: true
      }
    },
    methods: {
      initFields() {
        this.localObj = this.clone(this.value)
//        this.localObj = this.value
      },
      syncAutoFills(localObj) {

      },
      syncInvalidFields() {
        let requiredFields = getRequiredFields(this.localFieldsSetting)
        let invalidFields = getUnfilledRequiredField(this.localFieldsSetting, this.localObj)
        this.$nextTick(function () {
//          console.log('this.$refs = ', this.$refs)
          if (this.$refs[this.groupTitle]) { // 如果有需要校验的input组件，则要校验这些组件的值
            let refDoms = this.$refs[this.groupTitle]
            invalidFields = addInvalidateFields(requiredFields, invalidFields, refDoms)
          }
          this.$emit('invalidFieldsChanged', {invalidFields, groupTitle: this.groupTitle})
        })
      },
    }

  }
</script>
<style>
  .vux-popup-dialog {
    max-height: 60%;
  }
</style>
