// export default function clone(obj) {
//   let str;
//   if (typeof obj !== 'object' && typeof obj !== 'symbol') {
//     return obj
//   } else if (window.JSON) {
//     str = JSON.stringify(obj);
//     let newobj = JSON.parse(str);
//     return newobj;
//   } else {
//     let newobj = obj instanceof Array ? [] : {};
//     for (let i in obj) {
//       newobj[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i];
//     }
//     return newobj;
//   }
// }
export default function clone (obj) {
  if (typeof obj !== 'object') {
    return obj
  } else if (!obj) { // null
    return obj
  } else {
    let newobj = null
    if (obj instanceof Set) {
      newobj = new Set([...obj])
    } else if (obj instanceof Map) {
      newobj = new Map()
      obj.forEach((i, key) => {
        newobj.set(key, clone(i))
      })
    } else {
      newobj = obj instanceof Array ? [] : {}
      for (let i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]
        // console.log(' newobj = ', newobj)
      }
    }
    debugger

    console.log('obj = ', obj, 'newobj = ', newobj)
    return newobj
  }
}
