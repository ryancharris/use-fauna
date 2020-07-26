import { useState, useCallback } from 'react'
import faunadb, { query as q } from 'faunadb'

import { DataItem } from './types/fauna'
import { FaunaSchema, FaunaStatus } from './constants'

function createQuery(
  schema: string,
  client: faunadb.Client,
  scope: string,
  refId: string = ''
): null | Promise<DataItem> {
  console.log(refId)
  switch (schema) {
    case FaunaSchema.Collection:
      return client.query(q.Get(q.Collection(scope)))
    case FaunaSchema.Database:
      return client.query(q.Get(q.Database(scope)))
    case FaunaSchema.Document:
      return client.query(q.Get(q.Ref(q.Collection(scope), refId)))
    case FaunaSchema.Function:
      return client.query(q.Get(q.Function(scope)))
    case FaunaSchema.Index:
      return client.query(q.Get(q.Index(scope)))
  }

  return null
}

export default function useGet(client: faunadb.Client): [Function, null | DataItem, string] {
  console.log(client)
  const [data, setData] = useState<null | DataItem>(null)
  const [status, setStatus] = useState(FaunaStatus.NOT_LOADED)

  const get = useCallback((schema: string, scope: string, refId?: string) => {
    const fqlQuery = createQuery(schema, client, scope, refId)

    if (fqlQuery) {
      console.log('we have a query')
      fqlQuery
        .then((res: DataItem) => {
          setStatus(FaunaStatus.LOADING)
          setData(res)
          setStatus(FaunaStatus.LOADED)
        })
        .catch(err => {
          console.error(`[fauna-hooks] ${err}`)
          setStatus(FaunaStatus.ERROR)
        })
    }
  }, [])

  return [get, data, status]
}
