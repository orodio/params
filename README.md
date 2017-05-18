# `@orodio/params`

[![Build Status](https://travis-ci.org/orodio/params.svg?branch=master)](https://travis-ci.org/orodio/params)

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

### Dev

```
$ make               # see make help
$ make help          # shows all the make commands
$ make build         # build stuff puts it in /lib
$ make build-watch   # make build but all the time
$ make test          # tests the stuff
$ make test-watch    # make test but all the time
$ make version       # creates a patch tag
$ make version-minor # creates a minor tag
$ make version-major # creates a major tag
$ make publish       # publishes the module
```
