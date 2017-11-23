/**
 * Created by yangshan on 2017/11/17.
 */
import clone from './clone'

// null : false
// undefined : false
// NaN : false
// '' : false
// 0 : true
// '0' : true
// {} : true
// other : true
// false : true
export function meaningfulOrZero (obj) {  // 值为false且不是0
  if (!obj) {
    if (obj === 0 || typeof obj === 'boolean') {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}
export function totalFalse (obj) {
  return !meaningfulOrZero(obj)
}

export function has (arr, item) {
  return arr.indexOf(item) > -1
}
export function hasKey (obj, key) {
  return has(Object.keys(obj), key)
}

export function getPropValue (obj, propName) {
  let arr = []

  function _getProp (obj, propName) {
    let flag = false
    let prop = null
    if (typeof obj === 'object') {
      if (obj !== null) {
        if (hasKey(obj, propName)) {
          arr.push(propName)
          flag = true
          prop = obj[propName]
        } else {
          // debugger
          let a = Object.keys(obj)
          for (let i = 0, len = a.length; i < len; i++) {
            let key = a[i]
            let item = obj[key]
            arr.push(key)
            if (_getProp(item, propName).flag) {
              flag = true
              prop = item[propName]
              break
            }
            arr.pop()
          }
        }
      }
    } else {
      prop = obj
    }
    return {flag, prop}
  }

  let result = _getProp(obj, propName)
  return {...result, arr}
}

// let a = {d: {}, e: 2, b: {c: 1}}
// let result = getPropValue(a, 'c')
// console.log('getPropValue(a,"c") = ', result)
// setPropByArr(a, result.arr, 45)
// console.log('getPropValue(a,"c") = ', getPropValue(a, 'c'))

export function setPropByArr (obj, arr, value) {
  let arrTmp = clone(arr)
  let pName = arrTmp.shift()
  // debugger
  if (arrTmp.length > 0) {
    setPropByArr(obj[pName], arrTmp, value)
  } else {
    obj[pName] = value
  }
}

export function test () {
  debugger
  return 'test'
}

