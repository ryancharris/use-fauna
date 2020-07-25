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
  // console.log('client', client)

  // const [getAllDocuments, allDocs, allDocsStatus] = useGetAllDocuments(client)
  // const [getDocument, singleDoc, singleDocStatus] = useGetDocument(client)
  // const [createDocument, createdDoc, createDocStatus] = useCreateDocument(client)
  // const [deleteDocument, deletedDoc, deleteDocStatus] = useDeleteDocument(client)
  // const [updateDocument, updatedDoc, updateDocStatus] = useUpdateDocument(client)

  // console.log('allDocs', allDocs)
  // console.log('allDocsStatus', allDocsStatus)
  // console.log('singleDoc', singleDoc)
  // console.log('createdDoc', createdDoc)
  // console.log('deletedDoc', deletedDoc)
  // console.log('updatedDoc', updatedDoc)

  const [getAllInputValue, setGetAllInputValue] = useState('collections')
  const [getAll, data = null, status] = useGetAll(client)
  console.log('data', data)
  console.log('status', status)

  return (
    <div>
      <fieldset>
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
            getAll(getAllInputValue)
          }}
        >
          GetAll
        </button>

        {getAllInputValue && <div>Showing {getAllInputValue}</div>}
        {data &&
          data.map((item: DataItem) => {
            return <p>{`${item.ref}`}</p>
          })}
      </fieldset>
      {/* <button onClick={() => getAllDocuments('storehouses', 2)}>Get all docs</button> */}
      {/* <button onClick={() => getDocument('storehouses', '264990427443102227')}>
        Get single doc
      </button>
      <button onClick={() => createDocument('storehouses', { name: 'john mayer' })}>
        Create single doc
      </button>
      <button onClick={() => deleteDocument('storehouses', '269443476876165650')}>
        Delete single doc
      </button>
      <button
        onClick={() =>
          updateDocument('storehouses', '269443543992369683', {
            band: 'funky'
          })
        }
      >
        Update document
      </button> */}
    </div>
  )
}

export default Content
