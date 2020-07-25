import { renderHook, act } from '@testing-library/react-hooks'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useUpdateDocument from './useUpdateDocument'

describe('useUpdateDocument', () => {
  it('successfully updates a new document', async () => {
    // Instantiate new Client to access DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )

    // Render hook and returns
    const { result: docResult, waitForNextUpdate } = renderHook(() => useUpdateDocument(db.current))
    const updateDocument = docResult.current[0]
    const doc = docResult.current[1]
    const status = docResult.current[2]
    expect(updateDocument).toBeInstanceOf(Function)
    expect(doc).toBeNull()
    expect(status).toEqual(FaunaStatus.NOT_LOADED)

    act(async () => {
      // Trigger a request
      updateDocument('storehouses', '269507239351419410', {
        band: ['bass', 'drums', 'guitar']
      })
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

  it('fails to update a document', async () => {
    // Instantiate new Client to access DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )

    // Render hook and returns
    const { result: docResult, waitForNextUpdate } = renderHook(() => useUpdateDocument(db.current))
    const updateDocument = docResult.current[0]
    const doc = docResult.current[1]
    const status = docResult.current[2]

    act(async () => {
      updateDocument('storehouses', '123', {
        band: ['bass', 'drums', 'guitar']
      })

      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toBe(FaunaStatus.ERROR)
    })
  })
})
