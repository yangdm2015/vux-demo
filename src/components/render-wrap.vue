<template>
  <div>
    <anchored-heading
      v-model="defaultObj"
      :fieldsSetting="fieldsSetting"
      :groupName="groupName">
    </anchored-heading>
    {{defaultObj}}
  </div>

</template>
<script>
  import * as options from '../static-data/options'
  import { baseMixin } from '../components/mixins/base-mixins'
  import { inputFieldSetting } from '@/static-data/fields-setting'
  import anchoredHeading from './render.vue'
  import { applicantDefault } from '@/static-data/init-data'
  import { has, getPropValue } from '../utils/common-utils'
  let groupFields = ['name', 'idNumber', 'mainJob', 'bankCode', 'clientWorkType']
  let groupName = 'applicant'
  let currentInputFieldSetting = inputFieldSetting.filter(i =>
    i.parentObject[0] === groupName && has(groupFields, i.propName)
  )
  export default {
    mixins: [baseMixin],
    components: {
      anchoredHeading
    },
    data() {
      return {
        defaultObj: this.clone(applicantDefault),
//        defaultObj: applicantDefault,
        fieldsSetting: currentInputFieldSetting,
        groupName: groupName
      }
    },
    created() {
      this.syncObjPath()
    },
    watch: {
      defaultObj: {
        handler(v) {
          let clientWorkType = this.fieldsSetting.find(i => i.propName === 'clientWorkType')
          clientWorkType.props.options = options.backs
          if (v.bankCode === '103') {
//            console.log('中')

            console.log('clientWorkType = ', clientWorkType)
            console.log('this.fieldsSetting = ', this.fieldsSetting)
          } else {
            clientWorkType.props.options = options.clientWorkTypes
          }

        },
        deep: true
      }
    },
    methods: {
      syncObjPath(){
        this.fieldsSetting.forEach(i => {
          i.path = i.path ? i.path : getPropValue(this.defaultObj, i.propName).arr
//          console.log('i.path = ', i.path, 'localObj = ', this.localObj)
        })
      },
      idCheck(value) {
        let {pass, tip} = this.IdentityCodeValid(value)
        console.log('tip = ', tip)
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
