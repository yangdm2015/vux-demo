/**
 * Created by yangshan on 2017/10/20.
 */
export function sameValue(value) {
  return value
}

export function getGenderFromId(value) {
  if (value[16]) {
    let g = value[16] % 2 === 0 ? 0 : 1
    return g
  }
  return '0'
}

export function idNumber2Bir(idNumber) {
  // console.log('birthdate')
  if (typeof idNumber === 'string' && idNumber.length === 18) {
    let birthdate = idNumber.slice(6, 10) + '-' + idNumber.slice(10, 12) + '-' + idNumber.slice(12, 14)
    // console.log('birthdate = ', birthdate)
    return birthdate
  }
  return idNumber
}

export function getProfessionType(clientWorkType) {
  // console.log('clientWorkType = ', clientWorkType)
  if (!clientWorkType) {
    return ''
  } else if (clientWorkType === '0') {
    return '0'
  } else {
    return '1'
  }
}

export function getEc1RType(ec1RwBorrower) {
  let e = ec1RwBorrower
  if (e === '1' || e === '2' || e === '3') {
    return '0'
  } else {
    return '1'
  }
}