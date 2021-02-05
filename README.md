# Tour of hyper63 API

👋 Hello!

Welcome to the tour of the hyper63 services, in this tour, we will guide you through the 
📦 data service, 💲 cache service, and 🔎 search service. You will get a feel for how they work.

In this demo, we will walk through the hyper63 api for data, cache, storage and search

## Table of Contents

- [Setup](#setup)
- [Data](#data)
- [Cache](#cache)
- [Search](#search)

## Getting Started

Before we get started, you need to clone this repository: https://github.com/hyper63/tour 
Then you need to make sure you have NodeJS v14 or greater installed. And a code editor 
with a terminal. VS Code is a good choice.

## Setup

To work with this tutorial, you need to get a JWT token from https://play.hyper63.com
enter your email address and a token will be sent to you good for 30 days.

Open a terminal to this directory and set up your token env var.

export HYPER63_TOKEN=YOUR_TOKEN_HERE

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
// first lets add our documents

res = await $.post(`/data/${app}`, ghostbusters)
res = await $.post(`/data/${app}`, groundhogday)
res = await $.post(`/data/${app}`, avengers)

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

```
res = await $.put('/cache/${app}')
```

> NOTE: save 'index.js'

expected output

```
{"ok": true }
```

> NOTE: clear sandbox

remove a cache store

removing a cache store with the DELETE method

```
res = await $.delete('/cache/${app}')
```

> NOTE: save 'index.js'

expected output

```
{"ok": true}
```


add a key/value pair

a cache contains a key and a value,
the key must be a string, and a value,
which can be any json parsable value.

```
res = await $.post('/cache/${app}', {
  key: 'action-2012-avengers',
  value: avengers
})
```

> save 'index.js'

expected output

```
{ "ok": true }
```


remove a key/value pair

``` js
res = await $.delete(`/cache/${app}/action-2012-avengers`)
```

> NOTE: save `index.js`

expected output


``` sh
#> { "ok": true }
```

> NOTE: clear sandbox

query a key/value pair

You can run a simple query for a set of keys by using a simple match pattern.

```
abc* = starts with abc
*xyz = ends with xyz
abc*xyz = starts with abc and ends with xyz
```

To demonstrate, we will add a couple of key/value pairs 
to the cache.

``` js
res = await $.post('/cache/${app}', {
  key: 'action-avengers-2012',
  value: avenger
})

res = await $.post('/cache/${app}', {
  key: 'action-ghostbusters-1984',
  value: ghostbusters
})
```

> NOTE: save `index.js`

expected output

> NOTE: clear sandbox

Next we will query for all keys that start with action.

``` js
res = await $.post(`/cache/${app}/_query?pattern=action*`)
```

> Save `index.js`

expected output 

``` sh
```

> NOTE: clear sandbox

We can also query for all keys that end with 1984

``` js
res = await $.post(`/cache/${app}/_query?pattern=*1984`)
```

> Save `index.js`

expected output

``` sh
```

> NOTE: clear sandbox

Summary

This has been a quick introduction to the cache service, with these basic mechanics you can compose functions to create complex caching patterns to keep your applications responsive as they increase in traffic and need to scale.

For more information about the cache service, check out our docs, at https://docs.hyper63.com/cache-api

---

## Search

The search service allows you to create a search index specifying the fields you would
like to index in each document you provide to the search index. Then it the service gives you the create, read, update and delete commands, for basic search document management. Finally, the search service provides a query command to `search` your index with free text.

create a search index

Just like creating a data store or a cache we use a `put` to create a search index, the one difference, is that we have to provide a mapping object, this object tells the search index, which fields in the documents that we will be posting to the index will be used for the search. The property name to let the index know what fields to index is called `fields` and it takes an `array` of `strings` which should match your property names. You can optionally add another property called `storeFields` this property tells the search index what properties to return with the search results.

``` js
res = await $.put(`/search/${app}`, { 
  fields: ['title', 'year'], 
  storeFields: ['title', 'year', 'id', 'generes'] 
})
```

> NOTE: save `index.js`

expected output

``` sh
```

> NOTE: clear sandbox


remove a search index

Using the delete method, we can remove indexes as well.

``` js
res = $.delete(`/search/${app}`)
```

> NOTE: save `index.js`

expected output

``` sh
{"ok": true}
```

> NOTE: clear sandbox


add Documents

In order to search for documents, you need to add them to your search index, we can do that by using `post` one document at a time, or we can use the `_bulk` action to post a collection of documents.

First lets recreate our index

``` js
res = await $.put(`/search/${app}`, { 
  fields: ['title', 'year'], 
  storeFields: ['id', 'title', 'year', 'generes']
})
```

> NOTE: save `index.js`

expected output

``` sh
{ "ok": true}
```

> NOTE: clear sandbox

Next, lets add our movies as search documents.

``` js
res = await $.post(`/search/${app}/_bulk`, [ghostbusters, groundhogday, avengers])
```

> NOTE: save `index.js`

expected output

``` sh
{"ok": true, results: [] }
```

> NOTE: clear sandbox

query Index

Now that we have our search index created with some documents, lets do a query. A query is a `_query` command that we post to the service. In this command, we need to provide a json body that contains a property called `query`, we can optionally add other properties, like `term` and `filter`, but for now, lets just do a simple query. The query property takes a string that is used to match the search documents.

``` js
res = await $.post(`/search/${app}/_query`, { query: '1984' })
```

> NOTE: save `index.js`

expected output

``` sh
{ "ok": true, matches: [...] }
```

> NOTE: clear sandbox

Lets do another query, this time on the title.

``` js
res = await $.post(`/search/${app}/_query`, { query: 'Ghostbusters' })
```

> NOTE: save `index.js`

expected output

``` sh
{ "ok": true, matches: [...] }
```

> NOTE: clear sandbox

Summary

The search service provides a simple and easy to use interface to create search indexes, add/remove documents and query documents using free text. It is a powerful tool for any application and with hyper63 it comes inside the box. For more details about the search service checkout the documentation: https://docs.hyper63.com/search-api


### Conclusion

Well, that concludes the tour of the hyper63 service offering for now, we will be adding our storage service to the tour shortly, and more services will be included in the future. If you have a service you would like to see as part of hyper63, go to the discussions board and post your request: https://github.com/hyper63/hyper63/discussions

If you have any problems with this tour feel free to post an issue on https://github.com/hyper63/tour/issues, or submit a pull request to https://github.com/hyper63/tour.

If you enjoyed this tour, give our project a star: https://github.com/hyper63/hyper63 or post a tweet referencing `@hyper632`

👋 Until next time, have a great day! 🐶⚡

---


