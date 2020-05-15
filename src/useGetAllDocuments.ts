import { useEffect, useState } from 'react'
import faunadb from 'faunadb'
const { query: q } = faunadb
import { FAUNA_STATUS } from './constants'

interface GetAllDocumentsResponse {
  data?: Array<Document>
}

export default function useGetAllDocuments(
  db: faunadb.Client,
  collectionName: string,
  resultSize?: number
): [null | Array<Document>, string] {
  const [documents, setDocuments] = useState<null | Array<Document>>(null)
  const [status, setStatus] = useState<string>(FAUNA_STATUS.NOT_LOADED)

  useEffect(() => {
    const request = db.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(collectionName)), { size: resultSize || 100 }),
        q.Lambda(x => q.Get(x))
      )
    )

    request
      .then((res: GetAllDocumentsResponse) => {
        setStatus(FAUNA_STATUS.LOADING)
        setDocuments(res.data as Array<Document>)
      })
      .then(() => setStatus(FAUNA_STATUS.LOADED))
      .catch(err => {
        console.error(`[fauna-hooks] ${err}`)
        setStatus(FAUNA_STATUS.ERROR)
      })
  }, [])

  return [documents, status]
}
