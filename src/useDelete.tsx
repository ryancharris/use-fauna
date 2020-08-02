import { useState, useCallback } from 'react'
import faunadb, { query as q } from 'faunadb'

import { DataItem } from './types/fauna'
import { FaunaStatus } from './constants'

function createDeleteQuery(
  client: faunadb.Client,
  schema: string,
  name: string,
  refId?: string
): Promise<DataItem> | null {
  console.log('schema', schema)
  console.log('name', name)
  console.log('refId', refId)

  switch (schema) {
    case 'collection':
      return client.query(q.Delete(q.Collection(name)))
    case 'database':
      return client.query(q.Delete(q.Database(name)))
    case 'document':
      return client.query(q.Delete(q.Ref(q.Collection(name), refId)))
    case 'index':
      return client.query(q.Delete(q.Index(name)))
  }

  return null
}

export default function useDelete(client: faunadb.Client): [Function, null | DataItem, string] {
  const [deleteStatus, setDeleteStatus] = useState<string>(FaunaStatus.NOT_LOADED)
  const [deleteData, setDeleteData] = useState<null | DataItem>(null)
  const deleteFunction = useCallback((schema: string, name: string, refId?: string) => {
    const fqlQuery = createDeleteQuery(client, schema, name, refId)

    if (fqlQuery) {
      fqlQuery
        .then((res: DataItem) => {
          setDeleteStatus(FaunaStatus.LOADING)
          setDeleteData(res)
          setDeleteStatus(FaunaStatus.LOADED)
        })
        .catch(err => {
          console.error(`[fauna-hooks] ${err}`)
          setDeleteStatus(FaunaStatus.ERROR)
        })
    }
    return null
  }, [])

  console.log(client)

  return [deleteFunction, deleteData, deleteStatus]
}
