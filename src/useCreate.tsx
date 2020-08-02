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

interface IndexCreateParams {
  name: string
  data?: object
  source: Array<faunadb.ExprArg>
  terms?: any[]
  values?: any[]
  unique?: boolean
  serialized?: boolean
  permissions?: object
}

type CreateParams =
  | CollectionCreateParams
  | DatabaseCreateParams
  | DocumentCreateParams
  | IndexCreateParams

function createIndexParams(params: IndexCreateParams): CreateParams {
  // TODO: Figure out how to properly construct Term and Values
  // const termsParam = params.terms?.length ? params.terms.map(term => term) : [null]
  // const valuesParam = params.values?.length ? params.values.map(value => value) : [null]

  return {
    ...params,
    source: params.source.map(source => q.Collection(source)),
    terms: [null],
    values: [null]
  }
}

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
    case FaunaSchema.Index:
      return client.query(q.CreateIndex(createIndexParams(params as IndexCreateParams)))
    case FaunaSchema.Function:
      // FIXME: Fails since params.body is not right data type
      return client.query(q.CreateFunction(params))
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
