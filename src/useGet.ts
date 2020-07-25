import { useState, useCallback } from 'react'
import faunadb from 'faunadb'

import { DataItem } from './types/fauna'
import { FaunaStatus } from './constants'

export default function useGet(client: faunadb.Client): [Function, null | DataItem, string] {
  console.log(client)
  const [data] = useState(null)
  const [status] = useState(FaunaStatus.NOT_LOADED)
  const get = useCallback(() => {}, [])

  return [get, data, status]
}
