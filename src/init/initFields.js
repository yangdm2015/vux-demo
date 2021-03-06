/**
 * Created by yangshan on 2017/10/21.
 */
import { getPropValue } from '../utils/common-utils'
import { inputFieldSetting }from '../static-data/fields-setting'

function initFieldsRequirements (item) {
  console.log('initFieldsRequirements is running!')
  // if (item.propName === 'mainJob') {
  //   debugger
  // }
  if (item.isShow) {
    item.showTriggerPropName = item.isShow.split('===')[0].trim()
    item.showTriggerValue = item.isShow.split('===')[1].trim()
  }
  if (!item.noRequired) {
    item.noRequired = false // 默认都需要填写
    item.initNoRequired = false // 初始必填
  } else {
    item.initNoRequired = true // 初始非必填
  }
}

export function initFields () {
  console.log('inputFieldSetting = ', inputFieldSetting)
  for (let i in inputFieldSetting) {
    let item = inputFieldSetting[i]
    // console.log('item = ', item)
    initFieldsRequirements(item)
  }
  // Object.freeze(inputFieldSetting)
  // console.log('执行完毕！')
}
