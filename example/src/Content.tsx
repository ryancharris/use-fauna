import React, { useState } from 'react'
import faunadb from 'faunadb'

import { useFaunaClient, useGetAll } from 'use-fauna'
import {
  Collection,
  Database,
  Document,
  Function as FaunaFunction,
  Index
} from '../../src/types/fauna'

type DataItem = Collection | Database | Document | FaunaFunction | Index

function Content() {
  const client: faunadb.Client = useFaunaClient(process.env.REACT_APP_FAUNA_KEY as string)

  // useGetAll
  const [getAllInputValue, setGetAllInputValue] = useState('collections')
  const [collection, setCollection] = useState('')
  const [getAll, data = null, status] = useGetAll(client)
  console.log('data', data)
  console.log('status', status)

  return (
    <div>
      <div>
        <p>Get all of a schema type</p>
        <select
          name="schema"
          id="schema"
          value={getAllInputValue}
          onChange={e => {
            console.log(e)
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
            console.log('getAllInputValue', getAllInputValue)
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
                console.log(e.target.value)
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
    </div>
  )
}

export default Content
