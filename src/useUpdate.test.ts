import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useUpdate from './useUpdate'

describe('useUpdate', () => {
  it('successfully updates non-Document schemas', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useUpdate
    const { result, waitForNextUpdate } = renderHook(() => useUpdate(client))
    const updateFunction = result.current[0]
    const updateData = result.current[1]
    const updateStatus = result.current[2]

    expect(updateFunction).toBeInstanceOf(Function)
    expect(updateData).toBeNull()
    expect(updateStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      updateFunction('collection', 'orders', {
        data: {
          name: 'new-orders'
        }
      })

      await waitForNextUpdate()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(updateStatus).toEqual(FaunaStatus.LOADED)
      expect(updateData).toBeDefined()
      expect(updateData).toBeInstanceOf(Object)
    })
  })

  it('successfully updates Document', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useUpdate
    const { result, waitForNextUpdate } = renderHook(() => useUpdate(client))
    const updateFunction = result.current[0]
    const updateData = result.current[1]
    const updateStatus = result.current[2]

    expect(updateFunction).toBeInstanceOf(Function)
    expect(updateData).toBeNull()
    expect(updateStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      updateFunction('document', 'customers', {
        data: {
          firstName: "emacs"
        }
      }, '269603026108416530')

      await waitForNextUpdate()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(updateStatus).toEqual(FaunaStatus.LOADED)
      expect(updateData).toBeDefined()
      expect(updateData).toBeInstanceOf(Object)
    })
  })

  it('fails to update schema', () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useUpdate
    const { result, waitForNextUpdate } = renderHook(() => useUpdate(client))
    const updateFunction = result.current[0]
    const updateData = result.current[1]
    const updateStatus = result.current[2]

    expect(updateFunction).toBeInstanceOf(Function)
    expect(updateData).toBeNull()
    expect(updateStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      updateFunction('collection', 'hamburgers')

      await waitForNextUpdate()
      expect(updateData).toBeNull()
      expect(updateStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
