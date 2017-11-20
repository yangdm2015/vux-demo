/**
 * Created by yangshan on 2017/10/30.
 */
import * as options from '../static-data/options'

export const inputFieldSetting = [
  //   姓名
  {
    type: 'x-input',
    propName: 'name',
    label: '姓名',
    parentObject: ['applicant'],
    props: {
      max: 32,
      type: 'text'
    },
    attrs: {
      'data-propName': 'name',
    }
  },
  // 身份证号
  {
    type: 'x-input',
    propName: 'idNumber',
    label: '证件号码',
    parentObject: ['applicant'],
    isShow: 'bankCode === 103,102'
  },
  // 岗位
  {
    type: 'x-input',
    propName: 'mainJob',
    label: '主业',
    parentObject: ['applicant'],
    isShow: 'bankCode === 102'
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
]
