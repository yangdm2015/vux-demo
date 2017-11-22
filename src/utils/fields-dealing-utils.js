/**
 * Created by yangshan on 2017/11/17.
 */
import clone from './clone'
import { getPropValue, setPropByArr, totalFalse } from './common-utils'

function getFieldValue (field, obj) {
  let propName = field.propName
  return getPropValue(obj, propName).prop
}

function fieldNoValue (field, obj) {
  let value = getFieldValue(field, obj)
  if (value instanceof Array) {
    for (let i = 0, len = value.length; i < len; i++) {
      if (totalFalse(value[i])) {
        return true
      }
    }
  }
  if (!totalFalse(value)) { // 有值
    return false
  } else { // 完全没有值
    return true
  }
}

function trigger (targetPropValue, showTriggerValue) {
  if (showTriggerValue.indexOf(',') === -1) {
    return targetPropValue + '' === showTriggerValue + ''
  } else {
    let flag = false
    let testValues = showTriggerValue.split(',')
    testValues.forEach(item => {
      if (targetPropValue + '' === item + '') flag = true
    })
    return flag
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

function computeDisplay (curObj, curFS) {
  let flag = showField(curObj, curFS)
  return flag ? 'flex' : 'none'
}

function computStyle (curObj, curFS) {
  return curFS.showTriggerPropName ? `display:${computeDisplay(curObj, curFS)}` : ''
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

function xInputGen (fn, setting, propName, curObj) {
  // let setting = currentFieldSetting.find(i => i.propName === propName)
  // let children = []
  // let context = ''
  // if (setting.context) {
  //   if(typeof setting.context==='object'&&setting.context instanceof Array){
  //
  //   }else {
  //     context = setting.context
  //   }
  //   console.log('tmp = ', setting)
  // }
  return fn(setting.type, {
    attrs: {
      title: setting.label,
      style: computStyle(curObj, setting),
      'data-propName': propName,
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
          // console.log('setting = ', setting)
        }
        setPropByArr(curObj, arr, value)
      }
    },
    nativeOn: {
      click: function (e) {
        setting.nativeOn.click(curObj, setting)
      }
    },
    ...setting.highestProps
    // })
  }, setting.context)
}

function xInputGenbak (fn, setting, propName, curObj) {
  // let setting = currentFieldSetting.find(i => i.propName === propName)
  let highestProps = setting.highestProps
  let children = []
  if (setting.children) {
    // children = setting.children
    // let tmp = children.map(i => {
    //   fn(i.type, {}, i.context)
    // })
    console.log('tmp = ', setting)
  }
  return fn(setting.type, {
    attrs: {
      title: setting.label,
      style: computStyle(curObj, setting),
      'data-propName': propName,
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
          // console.log('setting = ', setting)
        }
        setPropByArr(curObj, arr, value)
      }
    },
    nativeOn: {
      click: function (e, curObj, setting) {
        console.log('e = ', e)
      }
    },
    ...highestProps
    // })
  }, setting.context)
}

export function groupGen (fn, fieldsSetting, curObj) {
  let result = []
  fieldsSetting.forEach(setting => {
    let propName = setting.propName
    result.push(xInputGen(fn, setting, propName, curObj))
  })
  return result
}

function getUnfilledFields (requiredFields, currentObject) {
  let invalidFields = new Set()
  requiredFields.forEach(field => {
    if (fieldNoValue(field, currentObject)) {
      // console.log('incalid field = ', field.propName)
      invalidFields.add(field)
    }
  })
  return invalidFields
}

export function getRequiredFields (fields) {
  return fields
    .filter(field => !field.noRequired && field.type !== 'autoFill' && field.type !== 'autoFillCascadeName')
}
export function getUnfilledRequiredField (fields, currentObject) {

  let requiredFields = getRequiredFields(fields)
  // console.log('requiredFields = ', requiredFields, ' currentObject = ', currentObject)
  return getUnfilledFields(requiredFields, currentObject)
}

export function addInvalidateFields (requiredFields, invalidFields, refDoms) {
  let invalidFieldsTmp = clone(invalidFields)
//        console.log('invalidFieldsTmp = ', [...invalidFieldsTmp].map(i => i.label))
  let requiredFieldsArray = [...requiredFields]
//        this.$refs[this.groupTitle].forEach((vc, idx) => {
  refDoms.forEach((vc, idx) => {
    let propName = vc.$attrs['data-propName']
//          if (propName === 'propertyYears') {
//            console.log('vc = ', vc)
//          }
    if (!vc.valid) {
      let f = requiredFieldsArray.find(field => field.propName === propName)
      if (f) {
        console.log(f.label)
        invalidFieldsTmp.add(f)
      }
    }
  })
  return invalidFieldsTmp
}
