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

  const [getAllDocuments, allDocs, status] = useGetAllDocuments(db)
  const [getDocument, singleDoc, status] = useGetDocument(db)
  const [createDocument, createdDoc, status] = useCreateDocument(db)
  const [deleteDocument, deletedDoc, status] = useDeleteDocument(db)
  const [updateDocument, updatedDoc, status] = useUpdateDocument(db)

  return (
    <div>
      <button onClick={() => getAllDocuments('storehouses', 2)}>Get all docs</button>
      <button onClick={() => getDocument('storehouses', '264990427443102227')}>
        Get single doc
      </button>
      <button onClick={() => createDocument('storehouses', { name: 'john mayer' })}>
        Create single doc
      </button>
      <button onClick={() => deleteDocument('storehouses', '269443476876165650')}>
        Delete single doc
      </button>
      <button
        onClick={() =>
          updateDocument('storehouses', '269443543992369683', {
            band: 'funky'
          })
        }
      >
        Update document
      </button>
    </div>
  )
}
export default App
