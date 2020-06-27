import React from 'react'

import {
  useDatabase,
  useGetDocument,
  useCreateDocument,
  useDeleteDocument,
  useUpdateDocument,
  useGetAllDocuments
} from 'use-fauna'

const App = () => {
  const db = useDatabase('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
  // console.log(db)
  // const [doc, status] = useUpdateDocument(db, 'products', '265275313753162259', {
  //   members: ['trey', 'mike']
  // })

  // const [getDocumentsByCollection, documents, status] = useGetAllDocuments(db, 'storehouses')

  // const [getDocument, doc, status] = useGetDocument(db, 'storehouses', '264990427443102227')

  // const [createDocument, doc, status] = useCreateDocument(db, 'storehouses')

  const [deleteDocument, doc, status] = useDeleteDocument(db)

  console.log('doc', doc)
  console.log('status', status)

  return (
    <div>
      {/* <button onClick={() => getDocumentsByCollection()}>Get all docs</button> */}
      {/* <button onClick={() => getDocument()}>Get single doc</button> */}
      {/* <button onClick={() => createDocument({ name: 'soulive' })}>Create single doc</button> */}
      <button onClick={() => deleteDocument('storehouses', '269443476876165650')}>
        Delete single doc
      </button>
    </div>
  )
}
export default App
