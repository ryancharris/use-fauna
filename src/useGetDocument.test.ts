import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGetDocument from './useGetDocument'

describe('useGetDocument', () => {
  it('gets document successfully', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )
    const database = db.current
    expect(database).toBeInstanceOf(faunadb.Client)

    // Render useGetDocument
    const { result, waitForNextUpdate } = renderHook(() => useGetDocument(database))
    const getDocument = await result.current[0]
    const doc = await result.current[1]
    const status = await result.current[2]

    expect(getDocument).toBeInstanceOf(Function)
    expect(doc).toBeNull()
    expect(status).toEqual(FaunaStatus.NOT_LOADED)

    // Trigger GET request
    act(async () => {
      getDocument('storehouses', '269443543992369683')

      // Changes to LOADING state
      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toEqual(FaunaStatus.LOADING)

      // Resolves with Document and LOADED status
      await waitForNextUpdate()
      expect(doc).toBeDefined()
      expect(doc).toBeInstanceOf(Document)
      expect(status).toEqual(FaunaStatus.LOADED)
    })
  })

  it('fails with the wrong refId', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )
    const database = db.current
    expect(database).toBeInstanceOf(faunadb.Client)

    // Render useGetDocument
    const { result, waitForNextUpdate } = renderHook(() => useGetDocument(database))
    const getDocument = await result.current[0]
    const doc = result.current[1]
    const status = result.current[2]

    act(async () => {
      getDocument('storehouses', '269443543992369683')

      // Fails to fetch data and resolves to ERROR
      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toEqual(FaunaStatus.ERROR)
    })
  })
})
