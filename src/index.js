import "babel-polyfill"

const encode = value =>
  encodeURIComponent(String(value))

const decode = value =>
  decodeURIComponent(value)

const cast = value =>
  Array.isArray(value)
    ? value.map(cast).join("|")
    : encode(value)

const build = (keys, obj) =>
  "?" + keys
    .sort((a,b) => a.localeCompare(b))
    .map(key => cast(key) + "=" + cast(obj[key])).join("&")

export const stringify = obj => {
  if (obj == null || Array.isArray(obj) || typeof obj !== "object") return ""
  const keys = Object.keys(obj).filter(key => obj[key] != null)
  if (!keys.length) return ""
  return build(keys, obj)
}

const trim = str =>
  str.charAt(0) === "?"
    ? str.substring(1)
    : str

const isNumber = val =>
  (/^-?\d+\.?\d*$/).test(val)

const isTrue = val =>
  (/^true$/).test(val)

const isFalse = val =>
  (/^false$/).test(val)

const isBoolean = val =>
  isTrue(val) || isFalse(val)

const isArray = val =>
  (/\|/).test(val)

const autoCast = str => {
  if (isNumber(str)) return parseFloat(str, 10)
  if (isBoolean(str)) return isTrue(str)
  if (isArray(str)) return str.split("|").map(autoCast)
  return decode(str)
}

export const parse = str => {
  if (typeof str !== 'string' || str === "") return {}
  return trim(str)
    .split("&")
    .map(kv => kv.split("="))
    .map(([key, value]) => ({ [decode(key)]:autoCast(value) }))
    .reduce((obj, cur) => ({ ...obj, ...cur }), {})
}
