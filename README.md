<h1 align="center">Tour of hyper ⚡️</h1>

👋 Hello!

Welcome to the tour of the hyper services, in this tour, we will guide you through the 
📦 data service, 💲 cache service, and 🔎 search service. You will get a feel for how they work.

In this tour, we will walk through the hyper api methods for data, cache, and search

---

## Table of Contents

- [Setup](#setup)
- [Data](#data)
- [Cache](#cache)
- [Search](#search)

## Getting Started

Before we get started, you need to clone this repository: https://github.com/hyper63/tour 
Then you need to make sure you have NodeJS v16 or greater installed https://nodejs.org. And a code editor 
with a terminal. VS Code is a good choice. https://code.visualstudio.com

### Prerequisites

* NodeJS v16+ https://nodejs.org
* Editor https://code.visualstudio.com
* Github Account https://github.com
* git https://git-scm.org

## Setup

The first thing we need to do, is to go to https://dashboard.hyper.io and login with our github account, once on the dashboard applications view, click the `add application` button. To create a new hyper app.

> A hyper app is a specific api service for a given name. It called an app because most of the time, this will be your API service layer for the application you are building and you would have one hyper app per application and environment.

Open a terminal to this directory and set up your HYPER env variable. In this directory create a new file called `.env` and in this file, you will want to copy the `connection-string` from the hyper dashboard of the new app you created and paste it as the value of the `HYPER` env variable.

.env

``` text
HYPER=[paste your connection string here]
```

> How do I get my connection string? Go to https://dashboard.hyper.io login with your github account, and then click on the application you created for this workshop, while viewing the app view, click the document icon to the left of the connection-string label. This will copy the string to your clipboard, now you can paste in your `.env` file.

Then run 

``` sh
npm install
npm install hyper-connect
```

Open the `index.js` file in your editor, everytime you type, you should see the results appear in your terminal.

> NOTE: after each section, there will be a note to `clear the sandbox` this means to delete all of the code between the `<sandbox></sandbox>`

---

## Data

add a document

Lets add a document to our new store, we have these movie documents 
already created above. Using the put command, we will re-create
the data store, and then using the post command we will create a
new document.

In between the `<sandbox></sandbox>` comments add the following
commands.

``` js
const result = await hyper.data.add({
  id: 'ghostbusters',
  type: 'movie',
  title: 'Ghostbusters',
  year: '1984',
  genres: ['action', 'comedy']
})

console.log(result)
```

> Save `index.js`

expected output

``` sh
#> { ok: true, id: 'ghostbusters' }
```

> NOTE: clear the sandbox 

get a document

Now that we saved a document, lets get the document by id

``` js
const result = await hyper.data.get('ghostbusters')
console.log(result)
```

> Save `index.js`

expected output

``` js
{
  id: 'ghostbusters',
  type: 'movie',
  title: 'Ghostbusters',
  year: '1984',
  genres: ['action', 'comedy']
}
```

> NOTE: clear sandbox

update a document

We can update a document using the put method.

``` js
let ghostbusters = await hyper.data.get('ghostbusters')
ghostbusters = {...ghostbusters, poster: 'ghostbusters.jpg'}
// update document
const result = await hyper.data.update('ghostbusters', ghostbusters)
console.log(result)
```

> Save `index.js`

expected output

```
{"ok":true,"id":"ghostbusters"}
```

> NOTE: clear sandbox

remove a document

We can also remove documents, by sending a `DELETE` command.

``` js
const result = await hyper.data.remove('ghostbusters')
console.log(result)
```

> Save `index.js`

expected output

``` json
{"ok":true,"id":"ghostbusters"}
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
const result = await hyper.data.bulk(movies)
console.log(result)
const { docs } = await hyper.data.query({
  type: 'movie',
  year: {
    $lt: '2012'
  }
})

console.log(docs)
```

> Save `index.js`

expected output

``` js
{
  ok: true,
  results: [
    { ok: true, id: 'ghostbusters' },
    { ok: true, id: 'avengers' },
    { ok: true, id: 'dune' }
  ]
}

[
  { type: 'movie', name: 'Avengers', year: '2011', id: 'avengers' },
  {
    type: 'movie',
    name: 'Ghostbusters',
    year: '1984',
    id: 'ghostbusters'
  }
]
```

> NOTE: clear sandbox


Summary

This is a quick tour through the data api, you can read more about the data api at our documentation site: https://docs.hyper.io/cloud

---

## Cache

The cache service, gives you a common interface to a cache service, whether it is memory, redis, or elastic cache. You can use the same api to manage key/value objects in a lighting fast cache.

add a key/value pair

a cache contains a key and a value,
the key must be a string, and a value,
which can be any json parsable value.

``` js
const result = await hyper.cache.add('action-2012-avengers', 
  { type: 'movie', title: 'Avengers', year: '2012', id: 'avengers' })

console.log(result)
```

> save `index.js`

expected output

``` sh
{ "ok": true }
```


remove a key/value pair

``` js
const result = await hyper.cache.remove('action-2012-avengers')
console.log(result)
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
const result1 = await hyper.cache.add('action-2012-avengers', {
  "id": "avengers",
  "type": "movie",
  "title": "Avengers",
  "year": "2012"
})

const result2 = await hyper.cache.add('action-1984-ghostbusters', {
  "id": "ghostbusters",
  "type": "movie",
  "title": "Ghostbusters",
  "year": "1984"
})

console.log(result1)
console.log(result2)
```

> NOTE: save `index.js`

expected output

> NOTE: clear sandbox

Next we will query for all keys that start with action.

``` js
const result = await hyper.cache.query('action*')
console.log(result.docs)
```

> Save `index.js`

expected output 

``` sh
[
  {
    key: 'action-2012-avengers',
    value: { id: 'avengers', type: 'movie', title: 'Avengers', year: '2012' }
  },
  {
    key: 'action-1984-ghostbusters',
    value: {
      id: 'ghostbusters',
      type: 'movie',
      title: 'Ghostbusters',
      year: '1984'
    }
  }
]
```

> NOTE: clear sandbox

We can also query for all keys that end with 1984

``` js
const result = await hyper.cache.query('*1984*')
console.log(result.docs)
```

> Save `index.js`

expected output

``` sh
[
  {
    key: 'action-1984-ghostbusters',
    value: {
      id: 'ghostbusters',
      type: 'movie',
      title: 'Ghostbusters',
      year: '1984'
    }
  }
]
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

add Documents

In order to search for documents, you need to add them to your search index, we can do that by using `post` one document at a time, or we can use the `_bulk` action to post a collection of documents.


Lets add our movies as search documents.

``` js
const result = await hyper.search.load(movies)
console.log(result)
```

> NOTE: save `index.js`

expected output

``` sh
{
  ok: true,
  results: [ { index: [Object] }, { index: [Object] }, { index: [Object] } ]
}
```

> NOTE: clear sandbox

query Index

Now that we have our search index created with some documents, lets do a query. A query is a `_query` command that we post to the service. In this command, we need to provide a json body that contains a property called `query`, we can optionally add other properties, like `term` and `filter`, but for now, lets just do a simple query. The query property takes a string that is used to match the search documents.

``` js
const result = await hyper.search.query('1984')
console.log(result)
```

> NOTE: save `index.js`

expected output

``` sh

{
  ok: true,
  matches: [
    {
      id: 'ghostbusters',
      type: 'movie',
      title: 'Ghostbusters',
      year: '1984'
    }
  ]
}
```

> NOTE: clear sandbox

Lets do another query, this time on the title.

``` js
const result = await hyper.search.query('Ghostbusters')
console.log(result)
```

> NOTE: save `index.js`

expected output

``` sh
{
  ok: true,
  matches: [
    {
      id: 'ghostbusters',
      type: 'movie',
      title: 'Ghostbusters',
      year: '1984'
    }
  ]
}
```

> NOTE: clear sandbox

Summary

The search service provides a simple and easy to use interface to create search indexes, add/remove documents and query documents using free text. It is a powerful tool for any application and with hyper63 it comes inside the box. For more details about the search service checkout the documentation: https://docs.hyper63.com/search-api


### Conclusion

Well, that concludes the tour of the hyper63 service offering for now, we will be adding our storage service to the tour shortly, and more services will be included in the future. If you have a service you would like to see as part of hyper63, go to the discussions board and post your request: https://github.com/hyper63/hyper/discussions

If you have any problems with this tour feel free to post an issue on https://github.com/hyper63/tour/issues, or submit a pull request to https://github.com/hyper63/tour.

If you enjoyed this tour, give our project a star: https://github.com/hyper63/hyper63 or post a tweet referencing `@_hyper_io`

👋 Until next time, have a great day! 🐶⚡

---


