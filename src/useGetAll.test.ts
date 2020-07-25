import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGetAll from './useGetAll'

describe('useGetAll', () => {
  it('gets all collections successfully', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxiwdnBACEyA9iCmaMjZ_Rs9Nb4xh3x8Wve70')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGetAllDocuments
    const { result, waitForNextUpdate } = renderHook(() => useGetAll(client))
    const getAll = result.current[0]
    const data = result.current[1]
    const status = result.current[2]

    expect(getAll).toBeInstanceOf(Function)
    expect(data).toBeNull()
    expect(status).toEqual(FaunaStatus.NOT_LOADED)

    await act(async () => {
      getAll('databases')

      await waitForNextUpdate()
      expect(data).toBeNull()
      expect(status).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(data).toBeDefined()
      console.log(data)
      expect(data).toBeInstanceOf(Array)
      expect(status).toEqual(FaunaStatus.LOADED)
    })
  })

  // it('fails get all documents', async () => {
  //   // Instantiate access to DB
  //   const { result: db } = renderHook(() =>
  //     useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
  //   )
  //   const database = db.current
  //   expect(database).toBeInstanceOf(faunadb.Client)

  //   // Render useGetAllDocuments
  //   const { result, waitForNextUpdate } = renderHook(() => useGetAllDocuments(database))
  //   const getAllDocuments = await result.current[0]
  //   const doc = result.current[1]
  //   const status = result.current[2]

  //   act(async () => {
  //     getAllDocuments('non-existent-collection')

  //     // Fails to fetch data and resolves to ERROR
  //     await waitForNextUpdate()
  //     expect(doc).toBeNull()
  //     expect(status).toEqual(FaunaStatus.ERROR)
  //   })
  // })
})

// describe('useGetAllDocuments', () => {
//   it('gets all documents successfully', async () => {
//     // Instantiate access to DB
//     const { result: db } = renderHook(() =>
//       useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
//     )
//     const database = db.current
//     expect(database).toBeInstanceOf(faunadb.Client)

//     // Render useGetAllDocuments
//     const { result, waitForNextUpdate } = renderHook(() => useGetAllDocuments(database))
//     const getAllDocuments = await result.current[0]
//     const doc = await result.current[1]
//     const status = await result.current[2]

//     expect(getAllDocuments).toBeInstanceOf(Function)
//     expect(doc).toBeNull()
//     expect(status).toEqual(FaunaStatus.NOT_LOADED)

//     // Trigger GET request
//     act(async () => {
//       getAllDocuments('storehouses', 2)

//       // Changes to LOADING state
//       await waitForNextUpdate()
//       expect(doc).toBeNull()
//       expect(status).toEqual(FaunaStatus.LOADING)

//       // Resolves with Document and LOADED status
//       await waitForNextUpdate()
//       expect(doc).toBeDefined()
//       expect(doc).toBeInstanceOf(Array)
//       expect(doc.length).toBe(2)
//       expect(status).toEqual(FaunaStatus.LOADED)
//     })
//   })

//   it('fails get all documents', async () => {
//     // Instantiate access to DB
//     const { result: db } = renderHook(() =>
//       useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
//     )
//     const database = db.current
//     expect(database).toBeInstanceOf(faunadb.Client)

//     // Render useGetAllDocuments
//     const { result, waitForNextUpdate } = renderHook(() => useGetAllDocuments(database))
//     const getAllDocuments = await result.current[0]
//     const doc = result.current[1]
//     const status = result.current[2]

//     act(async () => {
//       getAllDocuments('non-existent-collection')

//       // Fails to fetch data and resolves to ERROR
//       await waitForNextUpdate()
//       expect(doc).toBeNull()
//       expect(status).toEqual(FaunaStatus.ERROR)
//     })
//   })
// })
