import { useCallback, useState } from 'react'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'
import { DataItem } from './types/fauna'

export default function useUpdate(client: faunadb.Client): [Function, null | DataItem, string] {
  console.log(client)
  const [data] = useState<null | DataItem>(null)
  const [status] = useState<string>(FaunaStatus.NOT_LOADED)
  const updateFunction = useCallback((schema: string, name: string, scope?: string) => {
    console.log(schema)
    console.log(name)
    console.log(scope)
    return {} as DataItem
  }, [])

  return [updateFunction, data, status]
}
