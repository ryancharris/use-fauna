import { useState, useCallback } from 'react'
import faunadb from 'faunadb'
const { query: q } = faunadb
import { FAUNA_STATUS } from './constants'

export default function useUpdateDocument(db: faunadb.Client): [Function, null | Document, string] {
  const [status, setStatus] = useState<string>(FAUNA_STATUS.NOT_LOADED)
  const [document, setDocument] = useState<null | Document>(null)

  const updateDocument = useCallback((collectionName: string, refId: string, data: object) => {
    const request = db.query(q.Replace(q.Ref(q.Collection(collectionName), refId), { data }))

    request
      .then(async (res: object) => {
        setStatus(FAUNA_STATUS.LOADING)
        setDocument((await res) as Document)
        setStatus(FAUNA_STATUS.LOADED)
      })
      .catch(err => {
        console.error(`[fauna-hooks] ${err}`)
        setStatus(FAUNA_STATUS.ERROR)
      })
  }, [])

  return [updateDocument, document, status]
}
