import { renderHook } from '@testing-library/react-hooks'

import { FAUNA_STATUS } from './constants'

import useDatabase from './useDatabase'
import useCreateDocument from './useCreateDocument'

describe('useCreateDocument', () => {
  it('successfully creates a new document', async () => {
    const { result: db } = renderHook(() => useDatabase('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP'))
    const { result: docResult, waitForNextUpdate } = renderHook(() =>
      useCreateDocument(db.current, 'products', {
        members: ['trey', 'mike', 'paige', 'fish']
      })
    )

    expect(docResult.current).toStrictEqual([null, FAUNA_STATUS.NOT_LOADED])

    await waitForNextUpdate()

    expect(docResult.current[0]).toBeInstanceOf(Object)
    expect(docResult.current[1]).toEqual(FAUNA_STATUS.LOADED)
  })

  it('fails to create a new document', async () => {
    const { result: db } = renderHook(() => useDatabase('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP'))
    const { result: docResult, waitForNextUpdate } = renderHook(() =>
      useCreateDocument(db.current, 'non-existent-collection', {
        message: 'hello world'
      })
    )

    expect(docResult.current).toStrictEqual([null, FAUNA_STATUS.NOT_LOADED])

    await waitForNextUpdate()

    expect(docResult.current[0]).toBe(null)
    expect(docResult.current[1]).toEqual(FAUNA_STATUS.ERROR)
  })
})
