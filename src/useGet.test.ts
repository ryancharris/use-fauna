import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGet from './useGet'

describe('useGet', () => {
  it('successfully retrieves non-Document schemas', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGet
    const { result, waitForNextUpdate } = renderHook(() => useGet(client))
    const getFunction = result.current[0]
    const getData = result.current[1]
    const getStatus = result.current[2]

    expect(getFunction).toBeInstanceOf(Function)
    expect(getData).toBeNull()
    expect(getStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      getFunction('collection', 'orders')

      await waitForNextUpdate()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(getStatus).toEqual(FaunaStatus.LOADED)
      expect(getData).toBeDefined()
      expect(getData).toBeInstanceOf(Object)
    })
  })

  it('successfully retrieves Document', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGet
    const { result, waitForNextUpdate } = renderHook(() => useGet(client))
    const getFunction = result.current[0]
    const getData = result.current[1]
    const getStatus = result.current[2]

    expect(getFunction).toBeInstanceOf(Function)
    expect(getData).toBeNull()
    expect(getStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      getFunction('document', 'orders', '269603026111563282')

      await waitForNextUpdate()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(getStatus).toEqual(FaunaStatus.LOADED)
      expect(getData).toBeDefined()
      expect(getData).toBeInstanceOf(Object)
    })
  })

  it('fails to retrieve schema', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGet
    const { result, waitForNextUpdate } = renderHook(() => useGet(client))
    const getFunction = result.current[0]
    const getData = result.current[1]
    const getStatus = result.current[2]

    expect(getFunction).toBeInstanceOf(Function)
    expect(getData).toBeNull()
    expect(getStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      getFunction('collection', 'hamburgers')

      await waitForNextUpdate()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
