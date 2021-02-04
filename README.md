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

Open the index.js file in your editor, everytime you type, you should see the results
appear in your terminal.

---

## Data

create a data store, in the main function

``` js
let app = 'yourname-here' + '-movies' // must be lowercase and no spaces
res = await $.put(`/data/${app}`) // create data store
```

remove data store

``` js
res = await $.delete(`/data/${app}`) // remove data store
```

add a document

``` js
res = await $.put(`/data/${app}`) // create data store
res = await $.post(`/data/${app}`, Movie('Ghostbusters', '1984', ['comedy', 'action']))
```


get a document

update a document

remove a document

query a document


> NOTE: copy file to data-example.js

---

## Cache

create a cache store

remove a cache store

add a key/value pair

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


