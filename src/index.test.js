import { stringify, parse } from "./index"

const invariants = [
  [{},                        ""],
  [{ foo:"a" },               "?foo=a"],
  [{ foo:1 },                 "?foo=1"],
  [{ foo:1, bar:2 },          "?bar=2&foo=1"],
  [{ foo:0 },                 "?foo=0"],
  [{ foo:-1 },                "?foo=-1"],
  [{ foo:4.5 },               "?foo=4.5"],
  [{ foo:-4.5 },              "?foo=-4.5"],
  [{ foo:"4.5.5" },           "?foo=4.5.5"],
  [{ foo:"abc", bar:"xyz" },  "?bar=xyz&foo=abc"],
  [{ foo:"ab1c", bar:"xy9z"}, "?bar=xy9z&foo=ab1c"],
  [{ foo:"lol wat now" },     "?foo=lol%20wat%20now"],
  [{ foo:true },              "?foo=true"],
  [{ foo:false },             "?foo=false"],
  [{ foo:[1,2,3]},            "?foo=1|2|3"],
  [{ foo:[1,true,"bar"]},     "?foo=1|true|bar"],
]

const stringifyEdgeCases = [
//    ->
  [null, ""],
  [[],   ""],
  [{ foo:null }, ""],
  [{ foo:undefined },         ""],
  [{ foo:null, bar:2 },       "?bar=2"],
  [{ foo:undefined, bar:2 },  "?bar=2"],
]

const parseEdgeCases = [
//    <-
  [{}, null],
  [{}, undefined],
  [{}, 1],
  [{}, {}],
  [{}, []],
  [{}, true],
  [{ foo:"a" }, "foo=a"],
  [{ foo:1 }, "foo=1"],
  [{ foo:1, bar:2 }, "foo=1&bar=2"],
]

describe('params', () => {
  describe('invariants', () => {
    for (let [obj, str] of invariants)
      test(str, () => {
        expect(parse(stringify(obj))).toEqual(obj)
        expect(stringify(parse(str))).toEqual(str)
        expect(stringify(obj)).toEqual(str)
        expect(parse(str)).toEqual(obj)
      })
  })

  describe('edge cases', () => {
    describe('stringify', () => {
      for (let [obj, str] of stringifyEdgeCases)
        test(str, () => expect(stringify(obj)).toEqual(str))
    })

    describe('parse', () => {
      for (let [obj, str] of parseEdgeCases)
        test(str, () => expect(parse(str)).toEqual(obj))
    })
  })
})

