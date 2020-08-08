import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useUpdate from './useUpdate'

describe('useUpdate', () => {
  let client: faunadb.Client = new faunadb.Client()
  let updateFunction: Function = () => {}
  let updateData: null | object = null
  let updateStatus: string = ''
  let hookUpdateFunction: Function = () => {}

  beforeAll(() => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useUpdate
    const { result, waitForNextUpdate } = renderHook(() => useUpdate(client))
    updateFunction = result.current[0]
    updateData = result.current[1]
    updateStatus = result.current[2]
    hookUpdateFunction = waitForNextUpdate

    expect(updateFunction).toBeInstanceOf(Function)
    expect(updateData).toBeNull()
    expect(updateStatus).toBe(FaunaStatus.NOT_LOADED)
  })

  it('successfully updates non-Document schemas', () => {
    act(async () => {
      updateFunction('collection', 'orders', {
        data: {
          name: 'new-orders'
        }
      })

      await hookUpdateFunction()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(updateStatus).toEqual(FaunaStatus.LOADED)
      expect(updateData).toBeDefined()
      expect(updateData).toBeInstanceOf(Object)
    })
  })

  it('successfully updates Document', () => {
    act(async () => {
      updateFunction(
        'document',
        'customers',
        {
          data: {
            firstName: 'emacs'
          }
        },
        '269603026108416530'
      )

      await hookUpdateFunction()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(updateStatus).toEqual(FaunaStatus.LOADED)
      expect(updateData).toBeDefined()
      expect(updateData).toBeInstanceOf(Object)
    })
  })

  it('fails to update schema', () => {
    act(async () => {
      updateFunction('collection', 'hamburgers')

      await hookUpdateFunction()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
