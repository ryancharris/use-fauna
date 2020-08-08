import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useDelete from './useDelete'

describe('useDelete', () => {
  let client: faunadb.Client = new faunadb.Client()
  let deleteFunction: Function = () => {}
  let deleteData: null | object = null
  let deleteStatus: string = ''
  let hookUpdateFunction: Function = () => {}

  beforeAll(async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    const { result, waitForNextUpdate } = renderHook(() => useDelete(client))
    deleteFunction = result.current[0]
    deleteData = result.current[1]
    deleteStatus = result.current[2]
    hookUpdateFunction = waitForNextUpdate

    expect(deleteFunction).toBeInstanceOf(Function)
    expect(deleteData).toBeNull()
    expect(deleteStatus).toBe(FaunaStatus.NOT_LOADED)
  })

  it('successfully deletes non-Document type', () => {
    act(async () => {
      deleteFunction('collection', 'my-test-collection')

      await hookUpdateFunction()
      expect(deleteData).toBeNull()
      // expect(deleteStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(deleteStatus).toEqual(FaunaStatus.LOADED)
      expect(deleteData).toBeDefined()
      expect(deleteData).toBeInstanceOf(Object)
    })
  })

  xit('successfully deletes Document', () => {
    act(async () => {
      // deleteFunction('document', 'my-test-collection', refId)

      await hookUpdateFunction()
      expect(deleteData).toBeNull()
      // expect(deleteStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(deleteStatus).toEqual(FaunaStatus.LOADED)
      expect(deleteData).toBeDefined()
      expect(deleteData).toBeInstanceOf(Object)
    })
  })

  it('fails to retrieve Document without refId', () => {
    act(async () => {
      deleteFunction('document', { name: 'my-document' }, null)

      await hookUpdateFunction()
      expect(deleteData).toBeNull()
      expect(deleteStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
