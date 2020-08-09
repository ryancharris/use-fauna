import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGet from './useGet'

describe('useGet', () => {
  let client: faunadb.Client = new faunadb.Client()
  let getFunction: Function = () => {}
  let getData: null | object = null
  let getStatus = ''
  let hookUpdateFunction: Function = () => {}

  beforeAll(() => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGet
    const { result, waitForNextUpdate } = renderHook(() => useGet(client))
    getFunction = result.current[0]
    getData = result.current[1]
    getStatus = result.current[2]
    hookUpdateFunction = waitForNextUpdate

    expect(getFunction).toBeInstanceOf(Function)
    expect(getData).toBeNull()
    expect(getStatus).toBe(FaunaStatus.NOT_LOADED)
  })

  it('successfully retrieves non-Document schemas', () => {
    act(async () => {
      getFunction('collection', 'orders')

      await hookUpdateFunction()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(getStatus).toEqual(FaunaStatus.LOADED)
      expect(getData).toBeDefined()
      expect(getData).toBeInstanceOf(Object)
    })
  })

  it('successfully retrieves Document', () => {
    act(async () => {
      getFunction('document', 'orders', '269603026111563282')

      await hookUpdateFunction()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(getStatus).toEqual(FaunaStatus.LOADED)
      expect(getData).toBeDefined()
      expect(getData).toBeInstanceOf(Object)
    })
  })

  it('fails to retrieve schema', () => {
    act(async () => {
      getFunction('collection', 'hamburgers')

      await hookUpdateFunction()
      expect(getData).toBeNull()
      expect(getStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
