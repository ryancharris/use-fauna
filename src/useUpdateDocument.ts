import { useState, useCallback } from 'react'
import faunadb from 'faunadb'
const { query: q } = faunadb
import { FaunaStatus } from './constants'

export default function useUpdateDocument(db: faunadb.Client): [Function, null | Document, string] {
  const [status, setStatus] = useState<string>(FaunaStatus.NOT_LOADED)
  const [document, setDocument] = useState<null | Document>(null)

  const updateDocument = useCallback((collectionName: string, refId: string, data: object) => {
    const request = db.query(q.Replace(q.Ref(q.Collection(collectionName), refId), { data }))

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

  return [updateDocument, document, status]
}
