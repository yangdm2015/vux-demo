/**
 * Created by yangshan on 2017/11/17.
 */
export function getPropValue (obj, propName) {
  let arr = []

  function _getProp (obj, propName) {
    let flag = false
    let prop = null
    if (typeof obj === 'object') {
      if (hasKey(obj, propName)) {
        arr.push(propName)
        flag = true
        prop = obj[propName]
      } else {
        let a = Object.keys(obj)
        for (let i = 0, len = a.length; i < len; i++) {
          let key = a[i]
          let item = obj[key]
          arr.push(key)
//            console.log('item = ', item)
          if (_getProp(item, propName).flag) {
            flag = true
            prop = item[propName]
            break
          }
          arr.pop()
        }
      }
    }
    return {flag, prop}
  }

  let result = _getProp(obj, propName)
  return {...result, arr}
}

let a = {d: {}, e: 2, b: {c: 1}}
let result = getPropValue(a, 'c')
console.log('getPropValue(a,"c") = ', result)
setPropByArr(a, result.arr, 45)
console.log('getPropValue(a,"c") = ', getPropValue(a, 'c'))

export function setPropByArr (obj, arr, value) {
  let arrTmp = clone(arr)
  let pName = arrTmp.shift()
  debugger
  if (arrTmp.length > 0) {
    setPropByArr(obj[pName], arrTmp, value)
  } else {
    obj[pName] = value
  }
}
