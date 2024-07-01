import { helpers } from 'vuelidate/lib/validators'

export const isPhone = (val) => {
  if (val.test('/[0-9]{9,14}/')) {
    return true
  }
  return
}

export function isValidImgType(file) {
  return /\.(jpe?g|png)$/i.test(file.name)
}
export function isValidPDfType(file) {
  return /\.(pdf|PDF)$/.test(file.name)
}
export function isValidImgSize(fileSize, maxSize) {
  let sizeInKB = fileSize / 1024 / 1024
  if (sizeInKB <= maxSize) {
    return true
  } else {
    return false
  }
}

export const maxWords = (param) =>
  helpers.withParams({ type: 'maxWords', maxWords: param }, (value) =>
    value ? value.split(' ').length <= param : true
  )
export const minWords = (param) =>
  helpers.withParams({ type: 'minWords', minWords: param }, (value) =>
    value ? value.split(' ').length >= param : true
  )

export const isRequired = (value) => {
  if (value !== '') {
    return true
  } else {
    return false
  }
}
export const validPhoneNumber = (value) => {
  if (
    value &&
    value.match(/^(05|5|009665|\+9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)
  ) {
    return true
  } else {
    return false
  }
}
export const validateHomeNumber = (value) => {
  if (value && value.match(/^(01)(5|2|3|6|4|9|1|8|7)([0-9]{7})$/)) {
    return true
  } else {
    return false
  }
}
