/**
 * Created by yangshan on 2017/10/30.
 */
import * as options from '../static-data/options'
import { setPropByArr } from '../utils/common-utils'
import { computRequire } from '../utils/fields-dealing-utils'

const commonFieldProps = {
  'text-align': 'right'
}

const applicantInputProps = {
  ...commonFieldProps,
}
const applicantInputSetting = {
  type: 'x-input',
  parentObject: ['applicant'],
  highestProps: {
    ref: 'applicant',
    refInFor: true
  }
}
// function applicantInputAttrs(setting){
//
// }

export const inputFieldSetting = [
  //   姓名
  {
    ...applicantInputSetting,
    propName: 'name',
    label: '姓名',
    props: {
      max: 32,
      type: 'text',
      ...applicantInputProps
    },
  },
  // 身份证号
  {
    ...applicantInputSetting,
    propName: 'idNumber',
    label: '证件号码',
    isShow: 'bankCode === 103,102',
    props: {
      max: 32,
      type: 'text',
      ...applicantInputProps
    },
  },
  // 手机号
  // {
  //   ...applicantInputSetting,
  //   propName: 'mobile',
  //   label: '手机号',
  //   props: {
  //     ...applicantInputProps,
  //     max: 13,
  //     'is-type': 'china-mobile',
  //   },
  //   attrs: {}
  // },
  {
    ...applicantInputSetting,
    propName: 'mobile',
    label: '手机号',
    props: {
      ...applicantInputProps,
      max: 13,
      'is-type': 'china-mobile',
    },
    attrs: {}
  },
  // 主业
  {
    ...applicantInputSetting,
    propName: 'mainJob',
    label: '主业',
    isShow: 'bankCode === 102',
    props: {
      ...applicantInputProps,
    }

  },
  // 开户银行
  {
    type: 'popup-radio',
    propName: 'bankCode',
    label: '开户银行',
    parentObject: ['applicant'],
    props: {
      options: options['bankCodes'],
    }
  },
  // 客户类型
  {
    type: 'popup-radio',
    propName: 'clientWorkType',
    label: '客户类型',
    parentObject: ['applicant', 'extra'],
    props: {
      options: options['clientWorkTypes'],
    }
  },

  // 分割线
  {
    type: 'divider',
    propName: 'jobInfo',
    label: '客户信息',
    parentObject: ['applicant'],
    noRequired: true,
    context: '客户信息',
    children: [{
      type: 'span',
      attrs: {title: 'block'},
      context: '客户信息'
      // ['span', {attrs: {title: 'block'}}, '客户信息']
    }]
  },
// 按钮
  {
    type: 'x-button',
    propName: 'showContact2',
    label: '显示联系人2信息',
    attrs: {},
    props: {
      type: 'primary'
    },
    nativeOn: {
      click: function (curObj, setting) {
        console.log('curObj = ', curObj)
        // let arr = setting.path
        // setPropByArr(curObj, arr, value)
      }
    },
    parentObject: ['applicant'],
    noRequired: true,
    context: '显示联系人',
    highestProps: {
      class: 'show-contract2'
    }
  }

]
