import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useDelete from './useDelete'
import useCreate from './useCreate'

describe('useDelete', () => {
  let client = null as any

  beforeAll(async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    const { result } = renderHook(() => useCreate(client))
    const createFunction = result.current[0]
    await createFunction('collection', { name: 'my-test-collection' })
    // TODO: Get this creation to finish second test
    // await createFunction('document', { name: 'my-test-document' }, 'my-test-collection')
  })

  it('successfully deletes non-Document type', () => {
    const { result, waitForNextUpdate } = renderHook(() => useDelete(client))
    const deleteFunction = result.current[0]
    const deleteData = result.current[1]
    const deleteStatus = result.current[2]

    expect(deleteFunction).toBeInstanceOf(Function)
    expect(deleteData).toBeNull()
    expect(deleteStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      deleteFunction('collection', 'my-test-collection')

      await waitForNextUpdate()
      expect(deleteData).toBeNull()
      // expect(deleteStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(deleteStatus).toEqual(FaunaStatus.LOADED)
      expect(deleteData).toBeDefined()
      expect(deleteData).toBeInstanceOf(Object)
    })
  })

  xit('successfully deletes Document', () => {
    const { result, waitForNextUpdate } = renderHook(() => useDelete(client))
    const deleteFunction = result.current[0]
    const deleteData = result.current[1]
    const deleteStatus = result.current[2]

    expect(deleteFunction).toBeInstanceOf(Function)
    expect(deleteData).toBeNull()
    expect(deleteStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      deleteFunction('document', 'my-test-collection', refId)

      await waitForNextUpdate()
      expect(deleteData).toBeNull()
      // expect(deleteStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      console.log(deleteData)
      expect(deleteStatus).toEqual(FaunaStatus.LOADED)
      expect(deleteData).toBeDefined()
      expect(deleteData).toBeInstanceOf(Object)
    })
  })

  it('fails to retrieve Document without refId', () => {
    const { result, waitForNextUpdate } = renderHook(() => useDelete(client))
    const deleteFunction = result.current[0]
    const deleteData = result.current[1]
    const deleteStatus = result.current[2]

    expect(deleteFunction).toBeInstanceOf(Function)
    expect(deleteData).toBeNull()
    expect(deleteStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      deleteFunction('document', { name: 'my-document' }, null)

      await waitForNextUpdate()
      expect(deleteData).toBeNull()
      expect(deleteStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
