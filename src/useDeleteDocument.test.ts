import { renderHook } from '@testing-library/react-hooks'

import { FAUNA_STATUS } from './constants'

import useDatabase from './useDatabase'
import useDeleteDocument from './useDeleteDocument'

describe('useDeleteDocument', () => {
    it('successfully deletes a document', async () => {
        const collection = 'customers'
        const ref = '266450476974735890'

        const { result: db } = renderHook(() => useDatabase('fnADsp759rACEnFhmYqZLU7ESLG5L7fi-wbdCVhi'))
        const { result: docResult, waitForNextUpdate } = renderHook(() =>
        useDeleteDocument(db.current, collection, ref)
      )

      expect(docResult.current).toStrictEqual([null, FAUNA_STATUS.NOT_LOADED])

      await waitForNextUpdate()

      const responseRef = JSON.stringify(docResult.current[0].ref)
      const status = docResult.current[1]
  
      expect(status).toEqual(FAUNA_STATUS.LOADED)
      expect(responseRef).toContain(collection)
      expect(responseRef).toContain(ref)
    })

    it('fails to delete a document', async () => {
      const collection = 'customers'
      const ref = '266450476974735890'

      const { result: db } = renderHook(() => useDatabase('fnADsp759rACEnFhmYqZLU7ESLG5L7fi-wbdCVhi'))
      const { result: docResult, waitForNextUpdate } = renderHook(() =>
      useDeleteDocument(db.current, collection, ref)
    )

    expect(docResult.current).toStrictEqual([null, FAUNA_STATUS.NOT_LOADED])

    await waitForNextUpdate()

    const response = docResult.current[0]
    const status = docResult.current[1]

    expect(response).toBe(null)
    expect(status).toEqual(FAUNA_STATUS.ERROR)
  })
})  