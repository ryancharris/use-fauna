import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FAUNA_STATUS } from './constants'

import useDatabase from './useDatabase'
import useGetAllDocuments from './useGetAllDocuments'

describe('useGetAllDocuments', () => {
  it('gets all documents successfully', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() => useDatabase('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP'))
    const database = db.current
    expect(database).toBeInstanceOf(faunadb.Client)

    // Render useGetAllDocuments
    const { result, waitForNextUpdate } = renderHook(() => useGetAllDocuments(database))
    const getAllDocuments = await result.current[0]
    const doc = await result.current[1]
    const status = await result.current[2]

    expect(getAllDocuments).toBeInstanceOf(Function)
    expect(doc).toBeNull()
    expect(status).toEqual(FAUNA_STATUS.NOT_LOADED)

    // Trigger GET request
    act(async () => {
      getAllDocuments('storehouses', 2)

      // Changes to LOADING state
      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toEqual(FAUNA_STATUS.LOADING)

      // Resolves with Document and LOADED status
      await waitForNextUpdate()
      expect(doc).toBeDefined()
      expect(doc).toBeInstanceOf(Array)
      expect(doc.length).toBe(2)
      expect(status).toEqual(FAUNA_STATUS.LOADED)
    })
  })

  it('fails get all documents', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() => useDatabase('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP'))
    const database = db.current
    expect(database).toBeInstanceOf(faunadb.Client)

    // Render useGetAllDocuments
    const { result, waitForNextUpdate } = renderHook(() => useGetAllDocuments(database))
    const getAllDocuments = await result.current[0]
    const doc = result.current[1]
    const status = result.current[2]

    act(async () => {
      getAllDocuments('non-existent-collection')

      // Fails to fetch data and resolves to ERROR
      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toEqual(FAUNA_STATUS.ERROR)
    })
  })
})
