import { useCallback, useState } from 'react'
import faunadb, { query as q } from 'faunadb'

import { FaunaSchema, FaunaStatus } from './constants'
import { DataItem } from './types/fauna'

interface CollectionCreateParams {
  name: string
  data?: object
  history_days?: number
  ttl_days?: number
  permission?: object
}

interface DatabaseCreateParams {
  name: string
  data?: object
  api_version?: string
  priority?: number
}

interface DocumentCreateParams {
  name: string
  data?: object
  delegate?: object
  credentials?: object
  ttl: Date
}

type CreateParams = CollectionCreateParams | DatabaseCreateParams | DocumentCreateParams

function createQuery(
  schema: string,
  client: faunadb.Client,
  params: CreateParams,
  scope: string = ''
): null | Promise<DataItem> {
  switch (schema) {
    case FaunaSchema.Collection:
      return client.query(q.CreateCollection(params))
    case FaunaSchema.Database:
      return client.query(q.CreateDatabase(params))
    case FaunaSchema.Document:
      return client.query(q.Create(q.Collection(scope), params))
    case FaunaSchema.Function:
    case FaunaSchema.Index:
      console.log('schema', schema)
      break
  }

  return null
}

export default function useCreate(client: faunadb.Client): [Function, null | DataItem, string] {
  const [data, setData] = useState<null | DataItem>(null)
  const [status, setStatus] = useState(FaunaStatus.NOT_LOADED)

  const create = useCallback((schema: string, params: CreateParams, scope?: string) => {
    const fqlQuery = createQuery(schema, client, params, scope)

    if (fqlQuery) {
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

  return [create, data, status]
}
