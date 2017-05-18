# `@orodio/params`

### Install

```
yarn add @orodio/params
```

### Use

```
import { stringify, parse } from "@orodio/params"

stringify({ foo:1, bar:true, omg:[1,true,"baz"]})
// ?bar=true&foo=1&omg=1|true|baz

parse("?bar=true&foo=1&omg=1|true|baz")
// { foo:1, bar:true, omg:[1,true,"baz"]}

```