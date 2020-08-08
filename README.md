# use-fauna

> React hooks for FaunaDB

## Install

1. Install the package

```bash
npm install --save use-fauna
```

2. Import the library

``` javascript
import {
    useFaunaClient, 
    useGet, 
    useGetAll, 
    useCreate, 
    useDelete, 
    useUpdate
} = 'use-fauna'
```

## Current hooks

- `useFaunaClient`

Instantiate a Fauna client passing this hook an admin key.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
```

- `useGetAll`

Get all the Collections, Databases, Documents, Functions or Indexes.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
const [getAllFunction, data, status] = useGetAll(client)

getAllFunction('collections')
getAllFunction('databases')
getAllFunction('documents', 'my-collection')
getAllFunction('functions')
getAllFunction('indexes')
```

- `useGet`

Get an individual Collection, Database, Document, Function or Index.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
const [getFunction, data, status] = useGet(client)

getFunction('collection', 'my-collection')
getFunction('database', 'my-database')
getFunction('document', 'my-collection', 'REF_ID')
getFunction('function', 'my-function')
getFunction('index', 'my-index')
```

- `useCreate`

Create a Collection, Database, Document or Index.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
const [createFunction, data, status] = useCreate(client)

createFunction('collection', dataObject)
createFunction('database', dataObject)
createFunction('document', dataObject, 'my-collection')
createFunction('function', dataObject)
createFunction('index', dataObject)
```

- `useDelete`

Delete a Collection, Database, Document or Index.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
const [deleteFunction, data, status] = useCreate(client)

deleteFunction('collection', 'my-collection')
deleteFunction('database', 'my-database')
deleteFunction('document', 'my-collection', 'REF_ID')
deleteFunction('function', 'my-function')
deleteFunction('index', 'my-index')
```

- `useUpdate`

Update a Collection, Database, Document, Function, Index or Role.

``` javascript
const client = useFaunaClient('ADMIN_KEY')
const [updateFunction, data, status] = useCreate(client)

updateFunction('collection', 'my-collection', dataObject)
updateFunction('database', 'my-database', dataObject)
updateFunction('document', 'my-collection', dataObject,  'REF_ID')
updateFunction('function', 'my-function', dataObject)
updateFunction('index', 'my-index', dataObject)
```

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
