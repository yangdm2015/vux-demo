<script>
  import clone from '@/utils/clone-inspect'
  import { baseMixin } from '../components/mixins/base-mixins'
  import { Group, XInput, Cell, PopupRadio } from 'vux'
  import { getPropValue, setPropByArr, has } from '../utils/common-utils'
  import { groupGen } from '../utils/fields-dealing-utils'
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
        ]
      )
    },
    props: ['groupName', 'fieldsSetting', 'value'],
    components: {
      Group,
      XInput, Cell, PopupRadio
    },
    mixins: [baseMixin],
    data(){
      return {
        title: '测试输入框',
        inputModel1: '输入1',
        inputModel2: '输入2',
        localObj: {},
        localFieldsSetting: this.clone(this.fieldsSetting),
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
            console.log('localObj = ', v)
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
      initFields(){
        this.localObj = this.clone(this.value)
//        this.localObj = this.value
      },
      syncAutoFills(localObj){

      },
      syncInvalidFields(){

      },
      idCheck(value){
        let {pass, tip} = this.IdentityCodeValid(value)
//        console.log('tip = ', tip)
        if (pass) {
          return {valid: true}
        } else {
          return {valid: false, msg: tip}
        }
      }
    }

  }
</script>
<style>
  .vux-popup-dialog {
    max-height: 60%;
  }
</style>
