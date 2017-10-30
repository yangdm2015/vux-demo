/**
 * Created by yangshan on 2017/10/30.
 */
export const inputFieldSetting = [
  //   姓名
  {
    type: 'input',
    props:{

    }
  },
  // 身份证号
  {
    type: 'input',
    propName: 'idNumber',
    parentObject: ['applicant'],
    showStep: ['client'],
    inputType: 'Id',
  },
]
