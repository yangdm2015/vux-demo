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

function showField (curObj, setting) {
  let tpName = setting.showTriggerPropName
  let tpTriggerValue = setting.showTriggerValue
  let tpValue = getPropValue(curObj, tpName).prop

  return trigger(tpValue, tpTriggerValue)
}

function computeDisplay (curObj, setting) {
  if (setting.propName === 'emergencyContactName') {
    debugger
  }
  let flag = showField(curObj, setting)
  return flag ? 'flex' : 'none'
}

function computeStyle (curObj, setting) {

  return setting.showTriggerPropName ? `display:${computeDisplay(curObj, setting)}` : ''
}

function computeRequire4TriggeredField (curObj, curFS) {
  if (curFS.initNoRequired) {
    return false
  } else {
    return showField(curObj, curFS)
  }
}

function computeRequire (curObj, curFS) {
  return curFS.showTriggerPropName ? computeRequire4TriggeredField(curObj, curFS) : true
}

function computeContent (setting, fn) {
  let content = ''
  if (setting.content) {
    if (typeof setting.content === 'object' && setting.content instanceof Array) {
      content = setting.content.map(i => fn(i.type, {...i.slot}, i.content))
      // console.log('setting.context = ', setting.context)
      // context = [fn('span', {slot: 'right'}, '万元')]
    } else {
      content = setting.content
    }
    // console.log('content = ', content)
  }
  return content
}

function computeNativeOn (curObj, setting, self) {
  let nativeOn = {}
  if (setting.nativeOn && setting.nativeOn.click) {
    nativeOn.click = function (e) {
      setting.nativeOn.click(curObj, setting, self)
    }
  }
  return nativeOn
}

function setInputValue (curObj, setting, value) {
  let vTmp = value
  //
  if (setting.on && setting.on.input) {
    vTmp = setting.on.input(value)
  }

  setPropByArr(curObj, setting.path, vTmp)
}

function getShowValue (curObj, setting) {
  let vTmp = getPropValue(curObj, setting.propName).prop
  let targetPropName = setting.targetPropName
  let computFn = setting.computFn

  if (setting.value) {
    vTmp = setting.value(vTmp)
  }
  if (setting.propName === 'gender') {
    // debugger
  }
  if (computFn && targetPropName) {
    let targetPropValue = getPropValue(curObj, targetPropName).prop
    console.log('targetPropValue = ', targetPropValue)
    vTmp = computFn(targetPropValue)
  }
  return vTmp
}

function xInputGen (fn, setting, curObj, self) {
  // let setting = currentFieldSetting.find(i => i.propName === propName)
  // let children = []
  // console.log('self = ', self)
  return fn(setting.type, {
    attrs: {
      title: setting.label,
      style: computeStyle(curObj, setting),
      'data-propName': setting.propName,
      ...setting.attrs
    },
    props: {
      value: getShowValue(curObj, setting),
      required: computeRequire(curObj, setting),
      ...setting.props
    },
    on: {
      input: function (value) {
        setInputValue(curObj, setting, value)
      }
    },
    nativeOn: {...computeNativeOn(curObj, setting, self)},
    ...setting.highestProps
    // })
  }, computeContent(setting, fn))
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
      style: computeStyle(curObj, setting),
      'data-propName': propName,
      ...setting.attrs
    },
    props: {
      value: getPropValue(curObj, propName).prop,
      required: computeRequire(curObj, setting),
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

export function groupGen (fn, fieldsSetting, curObj, self) {
  let result = []
  fieldsSetting.forEach(setting => {
    result.push(xInputGen(fn, setting, curObj, self))
  })
  return result
}

function getUnfilledFields (requiredFields, currentObject) {
  let invalidFields = new Set()
  requiredFields.forEach(field => {
    if (fieldNoValue(field, currentObject)) {
      console.log('incalid field = ', field.propName)
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

export function setNumRate (rate) {
  let tmp = {
    on: {
      input(value){
        return value * rate
      }
    },
    value (value){
      return value / rate
    }
  }
  return tmp
}
