/**
 * Created by yangshan on 2017/11/17.
 */
import { getPropValue, setPropByArr } from './common-utils'

function trigger (targetPropValue, showTriggerValue) {

  if (showTriggerValue.indexOf(',') === -1) {
    return targetPropValue === showTriggerValue
  } else {
    let flag = false
    let testValues = showTriggerValue.split(',')
    testValues.forEach(item => {
      if (targetPropValue + '' === item + '') flag = true
    })
    return flag
  }
}

function getCascatedPropValue (obj, targetName, fields) {
  let targetField = fields.find(i => i.propName === targetName)
  let targetPropName = targetField.propName
  if (targetField.parentObject.length === 1) {
    return obj[targetPropName]
  } else if (targetField.parentObject.length === 2) {
    return obj[targetField.parentObject[1]][targetPropName]
  } else {
    console.log('targetField.parentObject.length > 2!')
  }
}

function showField (curObj, curFS) {
  let tpName = curFS.showTriggerPropName
  let tpTriggerValue = curFS.showTriggerValue
  let tpValue = getPropValue(curObj, tpName).prop
  // debugger
  if (!tpTriggerValue) {
    debugger
  }
  return trigger(tpValue, tpTriggerValue)
}

function a (curObj, curFS) {
  let flag = showField(curObj, curFS)
  return flag ? 'flex' : 'none'
}

function computStyle (curObj, curFS) {
  return curFS.showTriggerPropName ? `display:${a(curObj, curFS)}` : ''
}

function computRequire4TriggeredField (curObj, curFS) {
  if (curFS.initNoRequired) {
    return false
  } else {
    return showField(curObj, curFS)
  }
}

function computRequire (curObj, curFS) {
  return curFS.showTriggerPropName ? computRequire4TriggeredField(curObj, curFS) : true

}

function xInputGen (fn, currentFieldSetting, propName, curObj) {
  let setting = currentFieldSetting.find(i => i.propName === propName)
  return fn(setting.type, {
    attrs: {
      title: setting.label,
      style: computStyle(curObj, setting),
      ...setting.attrs
    },
    props: {
      value: getPropValue(curObj, propName).prop,
      required: computRequire(curObj, setting),
      ...setting.props
    },
    on: {
      input: function (value) {
        let arr = setting.path
        if (!arr) {
          console.log('setting = ', setting)
        }
        setPropByArr(curObj, arr, value)
      }
    }
  })
}

export function groupGen (fn, fieldsSetting, curObj) {
  let result = []
  fieldsSetting.forEach(setting => {
    let propName = setting.propName
    result.push(xInputGen(fn, fieldsSetting, propName, curObj))
  })
  return result
}
