# Tour of hyper63 API

In this demo, we will walk through the hyper63 api for data, cache, storage and search

## Table of Contents

- [Setup](#setup)
- [Data](#data)
- [Cache](#cache)
- [Search](#search)

## Setup

To work with this tutorial, you need to get a token from https://play.hyper63.com
enter your email address and a token will be sent to you good for 30 days.

Open a terminal to this directory and set up your token env var.

export HYPER63_TOKEN=....

Then run 

``` sh
yarn
yarn play
```

Open the `index.js` file in your editor, everytime you type, you should see the results
appear in your terminal.

In the `index.js` file you will notice a `sandbox` section, this is where you want to put the code snippets during the tour, while you can cut and paste, I would recommend you copy them and then save the `index.js`, and see the results appear in your terminal window.

> NOTE: after each section, there will be a note to `clear the sandbox` this means to delete all of the code between the `<sandbox></sandbox>`

---

## Data

create a data store, in the main function

``` js
let app = 'yourname-here' + '-movies' // must be lowercase and no spaces
res = await $.put(`/data/${app}`) // create data store
```
> Save `index.js`

expected output

``` sh
#> {ok: 'true'}
```

> NOTE: clear sandbox

remove data store

We can remove the data store by using the `DELETE` method

> NOTE: in the future, we may require a querystring param `confirm`
> to make sure that you want to truly delete the data store.

``` js
res = await $.delete(`/data/${app}`) // remove data store
```
> Save `index.js`

expected output

``` sh
{ ok: true }
```

> NOTE: clear the sandbox


add a document

Lets add a document to our new store, we have these movie documents 
already created above. Using the put command, we will re-create
the data store, and then using the post command we will create a
new document.

In between the `<sandbox></sandbox>` comments add the following
commands.

``` js
await $.put(`/data/${app}`) // create data store
res = await $.post(`/data/${app}`, ghostbusters)
```

> Save `index.js`

expected output

``` sh
#> { ok: true, id: 'ghostbusters-1984' }
```

> NOTE: clear the sandbox 

get a document

Now that we saved a document, lets get the document by id

``` js
res = await $.get(`/data/${app}/${ghostbusters.id}`)
```

> Save `index.js`

expected output

``` json
{"id":"ghostbusters-1984","type":"movie","title":"Ghostbusters","year":"1984","genres":["action","comedy"]}
```

> NOTE: clear sandbox

update a document

We can update a document using the put method.

``` js
ghostbusters = {...ghostbusters, poster: 'ghostbusters.jpg'}
// update document
res = await $.put(`/data/${app}/${ghostbusters.id}`, ghostbusters)
```

> Save `index.js`

expected output

```
{"ok":true,"id":"ghostbusters-1984"}
```

> NOTE: clear sandbox

remove a document

We can also remove documents, by sending a `DELETE` command.

``` js
res = await $.delete(`/data/${app}/${ghostbusters.id}`)
```

> Save `index.js`

expected output

``` json
{"ok":true,"id":"ghostbusters-1984"}
```

> NOTE: clear sandbox

query a document

hyper63 uses a powerful object structured query language similar to 
mongodb, on the backend it transforms it to the appropriate query for 
the given database.

You can view all of the options here: https://docs.hyper63.com/query-selector

In this tutorial, we will do a search on document type and year
less than 2000.


``` js
res = await $.post(`/data/${app}/_query`, {
  selector: {
    type: 'movie',
    year: {
      $lt: '2000'
    }
  }
})
```

> Save `index.js`

expected output

``` json
{"ok":true,"docs":[{"id":"groundhogday-1993","type":"movie","title":"GroundhogDay","year":"1993","genres":["fantasy","comedy"]}]}
```

> NOTE: clear sandbox


Summary

This is a quick tour through the data api, you can read more about the data api at our documentation site: https://docs.hyper63.com

---

## Cache

The cache service, gives you a common interface to a cache service, whether it is memory, redis, or elastic cache. You can use the same api to manage key/value objects in a lighting fast cache.


create a cache store

Creating a cache store is just like creating a 
data store. Instead of using the data service,
we use the cache service.

'''
res = await $.put('/cache/${app}')
'''

> NOTE: save 'index.js'

expected output

'''
{"ok": true }
'''

> NOTE: clear sandbox

remove a cache store

removing a cache store with the DELETE method

'''
res = await $.delete('/cache/${app}')
'''

> NOTE: save 'index.js'

expected output

'''
{"ok": true}
'''


add a key/value pair

a cache contains a key and a value,
the key must be a string, and a value,
which can be any json parsable value.

'''
res = await $.post('/cache/${app}', {
  key: 'action-2012-avengers',
  value: avengers
})
'''

> save 'index.js'

expected output

'''
{ "ok": true }
'''


remove a key/value pair

query a key/value pair

> NOTE: copy file to cache-example.js

---

## Search

create a search index

remove a search index

add Documents

query Index

> NOTE: copy file to search-example.js

---


