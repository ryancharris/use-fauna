import { useState, useCallback } from 'react'
import faunadb, { query as q } from 'faunadb'
import { FaunaSchemas, FaunaStatus } from './constants'
import { Collection, Database, Document, Function as FaunaFunction, Index } from './types/fauna'

type SchemaArray = Collection[] | Database[] | Document[] | FaunaFunction[] | Index[]

type QueryResponse = {
  data: SchemaArray
}

function createSchemaQuery(
  schema: string,
  client: faunadb.Client,
  scope: string = ''
): Promise<QueryResponse> | null {
  console.log('scope', scope)

  switch (schema) {
    case FaunaSchemas.Collections:
      return client.query(
        q.Map(
          q.Paginate(q.Collections()),
          q.Lambda(x => q.Get(x))
        )
      )
    case FaunaSchemas.Databases:
      return client.query(
        q.Map(
          q.Paginate(q.Databases()),
          q.Lambda(x => q.Get(x))
        )
      )
    case FaunaSchemas.Documents:
      return client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection(scope))),
          q.Lambda(x => q.Get(x))
        )
      )
    case FaunaSchemas.Functions:
      return client.query(
        q.Map(
          q.Paginate(q.Functions()),
          q.Lambda(x => q.Get(x))
        )
      )
    case FaunaSchemas.Indexes:
      return client.query(
        q.Map(
          q.Paginate(q.Indexes()),
          q.Lambda(x => q.Get(x))
        )
      )
  }
  return null
}

export default function useGetAll(client: faunadb.Client): [Function, null | SchemaArray, string] {
  const [status, setStatus] = useState(FaunaStatus.NOT_LOADED)
  const [data, setData] = useState<null | SchemaArray>(null)

  const getAll = useCallback((schema: string, scope?: string): void => {
    const fqlQuery = createSchemaQuery(schema, client, scope)

    if (fqlQuery) {
      fqlQuery
        .then((res: QueryResponse) => {
          setStatus(FaunaStatus.LOADING)
          setData(res.data)
          setStatus(FaunaStatus.LOADED)
        })
        .catch(err => {
          console.error(`[fauna-hooks] ${err}`)
          setStatus(FaunaStatus.ERROR)
        })
    }
  }, [])

  return [getAll, data, status]
}
