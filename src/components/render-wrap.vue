<template>
  <div class="render-wrap">
    <anchored-heading
      v-model="defaultObj"
      :fieldsSetting="fieldsSetting"
      :groupTitle="groupTitle"
      @invalidFieldsChanged="showFields">
    </anchored-heading>
    {{defaultObj}}
  </div>

</template>
<script>
  import clone from '../utils/clone'
  import * as options from '../static-data/options'
  import { baseMixin } from '../components/mixins/base-mixins'
  import { inputFieldSetting } from '@/static-data/fields-setting'
  import anchoredHeading from './render.vue'
  import { applicantDefault } from '@/static-data/init-data'
  import { has, getPropValue } from '../utils/common-utils'
  //  let groupFields = [
  //    'name', 'idNumber', 'mainJob',
  //    'bankCode', 'clientWorkType',
  //    'mobile', 'jobInfo', 'showContact2', 'gender', 'annualIncome']
  let groupFields = [
    'name', 'idNumber', 'mainJob', 'bankCode', 'clientWorkType',
    'mobile', 'jobInfo', 'showContact2', 'gender', 'annualIncome',
    'emergencyContactName'
  ]
  let groupTitle = 'applicant'
  //  console.log('in render Wrap, inputFieldSetting =', inputFieldSetting)

  export default {
    mixins: [baseMixin],
    components: {
      anchoredHeading
    },
    data() {
      return {
        defaultObj: this.clone(applicantDefault),
//        defaultObj: applicantDefault,
        fieldsSetting: [],
        groupTitle
      }
    },
    created() {
      this.getfields()
    },
    watch: {
      defaultObj: {
        handler(v) {
          let clientWorkType = this.fieldsSetting.find(i => i.propName === 'clientWorkType')
          if (clientWorkType) {
            clientWorkType.props.options = options.backs
            if (v.bankCode === '103') {
            } else {
              clientWorkType.props.options = options.clientWorkTypes
            }
          }
        },
        deep: true
      }
    },
    methods: {
      getfields(){
//        debugger
        this.fieldsSetting = clone(inputFieldSetting.filter(i =>
          i.parentObject[0] === groupTitle && has(groupFields, i.propName)
        ))
        this.syncObjPath()
      },
      showFields({invalidFields}) {
        this.invalidFields = invalidFields
        console.log('this.invalidFields.size = ', this.invalidFields.size)
//        console.log('this.invalidFields = ', this.invalidFields)
      },
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
<style rel=" stylesheet/scss" lang="scss" scoped>
  .vux-popup-dialog {
    max-height: 60%;
  }

  .render-wrap {
    /deep/ .show-contract2 {
      background: none !important;
      color: #20a0ff !important;
      &:after {
        border: none !important;
      }
    }
  }
</style>
