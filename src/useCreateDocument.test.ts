import { renderHook, act } from '@testing-library/react-hooks'

import { FAUNA_STATUS } from './constants'

import useFaunaClient from './useFaunaClient'
import useCreateDocument from './useCreateDocument'

describe('useCreateDocument', () => {
  it('successfully creates a new document', async () => {
    // Instantiate new Client to access DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )

    // Render hook and returns
    const { result: docResult, waitForNextUpdate } = renderHook(() => useCreateDocument(db.current))
    const createDocument = docResult.current[0]
    const doc = docResult.current[1]
    const status = docResult.current[2]
    expect(createDocument).toBeInstanceOf(Function)
    expect(doc).toBeNull()
    expect(status).toEqual(FAUNA_STATUS.NOT_LOADED)

    act(async () => {
      // Trigger a request
      createDocument('storehouses', {
        band: ['bass', 'drums', 'guitar']
      })
      // Changes to LOADING state
      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toEqual(FAUNA_STATUS.LOADING)

      // Resolves with Document and LOADED status
      await waitForNextUpdate()
      expect(doc).toBeDefined()
      expect(doc).toBeInstanceOf(Document)
      expect(status).toEqual(FAUNA_STATUS.LOADED)
    })
  })

  it('fails to create a new document', async () => {
    // Instantiate new Client to access DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )

    // Render hook and returns
    const { result: docResult, waitForNextUpdate } = renderHook(() => useCreateDocument(db.current))
    const createDocument = docResult.current[0]
    const doc = docResult.current[1]
    const status = docResult.current[2]

    act(async () => {
      createDocument(null, null)

      await waitForNextUpdate()
      expect(doc).toBeNull()
      expect(status).toBe(FAUNA_STATUS.ERROR)
    })
  })
})
