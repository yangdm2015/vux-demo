/**
 * Created by yangshan on 2017/10/21.
 */
import * as options from './options'
import * as computeFunctions from './auto-fill-dealing-functions'
import { idVerify, positiveNumbeVerify } from '../static-data/form-validate-functions'
import { calendarFormat } from '../static-data/form-format-functions'
import * as sld from './input-field-setting'


export function initFieldsLabel(item) {
  if (item.parentObject.length === 1) {
    item.label = options[item.parentObject[0] + 'Label'][item.propName]
  } else if (item.parentObject.length === 2) {
    item.label = options[item.parentObject[0] + 'Label'][item.parentObject[1]][item.propName]
  }
}

function initFieldsRequirements(item) {
  if (item.isShow) {
    item.showTriggerPropName = item.isShow.split('===')[0].trim()
    item.showTriggerValue = item.isShow.split('===')[1].trim()
  }
  if (!item.noRequired) {
    item.noRequired = false; // 默认都需要填写
    item.initNoRequired = false; // 初始必填
  } else {
    item.initNoRequired = true; // 初始非必填
  }
}

function initFieldsTelFormat(item) {
  if (item.inputType === 'tel') {
    item['is-type'] = 'china-mobile'
    item.max = 11
    item.inputType = 'number'
    // item.mask = '999 9999 9999'
  }
}
function initFieldsChinaNameFormat(item) {
  if (item.inputType === 'china-name') {
    item['is-type'] = 'china-name'
    // item.mask = '999 9999 9999'
    delete item.inputType
  }
}
function initFieldsIdFormat(item) {
  if (item.inputType === 'Id') {
    item['is-type'] = idVerify
    item.max = 18
    item.inputType = 'text'
  }
}
function initAutoFillFields(item) {
  if (item.type === 'autoFill') {
    if (item.autoFillType === 'computFn') {
      item.computFn = computeFunctions[item.computFn]
    }
  }
}

function initPositiveNumber(item) {
  if (item.inputType === 'p-number') {
    item['is-type'] = positiveNumbeVerify
    item.inputType = 'number'
  }
  if (item.propName === 'propertyYears') {
    // console.log('initPositiveNumber init ', item)
  }
}

function initCalendarFormat(item) {
  if (item.type === 'calendar') {
    item['display-format'] = calendarFormat
  }
}

export function initFields() {
  for (let i in sld.inputFieldSetting) {
    let item = sld.inputFieldSetting[i]
    // console.log('item = ', item)
    initFieldsLabel(item)
    initFieldsRequirements(item)
    initFieldsTelFormat(item)
    initFieldsChinaNameFormat(item)
    initFieldsIdFormat(item)
    initAutoFillFields(item)
    initPositiveNumber(item)
    initCalendarFormat(item)
  }
  // console.log('执行完毕！')
}
