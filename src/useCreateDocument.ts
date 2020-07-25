import { useState, useCallback } from 'react'
import faunadb from 'faunadb'
const { query: q } = faunadb
import { FaunaStatus } from './constants'

export default function useCreateDocument(db: faunadb.Client): [Function, null | Document, string] {
  const [status, setStatus] = useState<string>(FaunaStatus.NOT_LOADED)
  const [document, setDocument] = useState<null | Document>(null)

  const createDocument = useCallback((collectionName: string, data: object) => {
    const request = db.query(q.Create(q.Collection(collectionName), { data }))

    request
      .then(async (res: object) => {
        setStatus(FaunaStatus.LOADING)
        setDocument((await res) as Document)
        setStatus(FaunaStatus.LOADED)
      })
      .catch(err => {
        console.error(`[fauna-hooks] ${err}`)
        setStatus(FaunaStatus.ERROR)
      })
  }, [])

  return [createDocument, document, status]
}
