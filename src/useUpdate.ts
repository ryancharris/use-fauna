import { useCallback, useState } from 'react'
import faunadb, { query as q } from 'faunadb'

import { FaunaSchema, FaunaStatus } from './constants'
import { DataItem } from './types/fauna'

interface UpdateQueryDocumentData {
  data: object
  credentials: object
  delegates: object
}

function createQuery(
  client: faunadb.Client,
  schema: string,
  name: string,
  data: UpdateQueryDocumentData,
  refId: string = ''
): null | Promise<object> {
  // TODO: Need to add Keys and Roles functionality
  switch (schema) {
    case FaunaSchema.Collection:
      return client.query(q.Update(q.Collection(name), data))
    case FaunaSchema.Database:
      return client.query(q.Update(q.Database(name), data))
    case FaunaSchema.Document:
      return client.query(q.Update(q.Ref(q.Collection(name), refId), data))
    case FaunaSchema.Function:
      return client.query(q.Update(q.Function(name), data))
    case FaunaSchema.Index:
      return client.query(q.Update(q.Index(name), data))
  }

  return null
}

export default function useUpdate(client: faunadb.Client): [Function, null | object, string] {
  console.log(client)
  const [data, setData] = useState<null | object>(null)
  const [status, setStatus] = useState<string>(FaunaStatus.NOT_LOADED)
  const updateFunction = useCallback(
    (schema: string, name: string, data: UpdateQueryDocumentData, refId?: string) => {
      const fqlQuery = createQuery(client, schema, name, data, refId)

      if (fqlQuery) {
        fqlQuery
          .then((res: object) => {
            setStatus(FaunaStatus.LOADING)
            setData(res)
            setStatus(FaunaStatus.LOADED)
          })
          .catch(err => {
            console.error(`[fauna-hooks] ${err}`)
            setStatus(FaunaStatus.ERROR)
          })
      }
      return {} as DataItem
    },
    []
  )

  return [updateFunction, data, status]
}
