import React, { useState } from 'react'
import faunadb from 'faunadb'

import { useFaunaClient, useGetAll, useGet } from 'use-fauna'
import { DataItem } from '../../src/types/fauna'

function Content() {
  const client: faunadb.Client = useFaunaClient(process.env.REACT_APP_FAUNA_KEY as string)

  // useGetAll
  const [getAllInputValue, setGetAllInputValue] = useState('collections')
  const [collection, setCollection] = useState('')
  const [getAll, data = null, status] = useGetAll(client)
  console.log('data', data)
  console.log('status', status)

  // useGet
  const [getFunction, getData, getStatus] = useGet(client)
  const [getSchema, setGetSchema] = useState('collection')
  const [getRefId, setGetRefId] = useState('')
  const [useGetRefId, setUseGetRefId] = useState('')
  console.log('getFunction', getFunction)
  console.log('getData', getData)
  console.log('getStatus', getStatus)

  return (
    <div>
      {/* useGetAll */}
      <div>
        <p>Get all of a schema type</p>
        <select
          name="schema"
          id="schema"
          value={getAllInputValue}
          onChange={e => {
            setGetAllInputValue(e.target.value)
          }}
          defaultValue={0}
        >
          <option value="collections">collections</option>
          <option value="databases">databases</option>
          <option value="documents">documents</option>
          <option value="functions">functions</option>
          <option value="indexes">indexes</option>
        </select>
        <button
          onClick={() => {
            getAllInputValue === 'documents'
              ? getAll(getAllInputValue, collection)
              : getAll(getAllInputValue)
          }}
        >
          GetAll
        </button>
        {getAllInputValue === 'documents' && (
          <div>
            <label htmlFor="collection">Collection name</label>
            <input
              id="collection"
              value={collection}
              onChange={e => {
                setCollection(e.target.value)
              }}
            />
          </div>
        )}

        {getAllInputValue && data && <div>Showing {getAllInputValue}</div>}
        {data &&
          data.map((item: DataItem) => {
            return <p>{`${item.ref}`}</p>
          })}
      </div>

      <hr />

      {/* useGet */}
      <div>
        <div>
          <label htmlFor="getRef">
            {getSchema !== 'document' ? `${getSchema}` : 'collection'} name
          </label>
          <input
            id="getRef"
            type="getRef"
            value={getRefId}
            onChange={e => setGetRefId(e.target.value)}
          />
          {getSchema === 'document' && (
            <>
              <label htmlFor="useGetRefId">Document RefId</label>
              <input
                id="useGetRefId"
                value={useGetRefId}
                onChange={e => setUseGetRefId(e.target.value)}
              />
            </>
          )}
        </div>
        <select
          name="getSchema"
          id="getSchema"
          value={getSchema}
          onChange={e => {
            setGetSchema(e.target.value)
          }}
          defaultValue={0}
        >
          <option value="collection">collection</option>
          <option value="database">database</option>
          <option value="document">document</option>
          <option value="function">function</option>
          <option value="index">index</option>
        </select>
        <button
          onClick={e => {
            e.preventDefault()
            getFunction(getSchema, getRefId, useGetRefId)
          }}
        >
          Get
        </button>
      </div>
    </div>
  )
}

export default Content
