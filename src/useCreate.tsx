import { useState } from 'react'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'
import { DataItem } from './types/fauna'

export default function useCreate(client: faunadb.Client): [Function, null | DataItem, string] {
  const [data, setData] = useState(null)
  const [status, setState] = useState(FaunaStatus.NOT_LOADED)

  console.log(client)
  return [() => {}, data, status]
}
