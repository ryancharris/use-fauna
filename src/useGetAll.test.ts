import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGetAll from './useGetAll'

describe('useGetAll', () => {
  it('gets all collections successfully', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGetAllDocuments
    const { result, waitForNextUpdate } = renderHook(() => useGetAll(client))
    const getAll = result.current[0]
    const data = result.current[1]
    const status = result.current[2]

    expect(getAll).toBeInstanceOf(Function)
    expect(data).toBeNull()

    act(async () => {
      getAll('databases')

      await waitForNextUpdate()
      expect(data).toBeNull()
      expect(status).toEqual(FaunaStatus.NOT_LOADED)

      await waitForNextUpdate()
      expect(status).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(status).toEqual(FaunaStatus.LOADED)
      expect(data).toBeDefined()
      expect(data).toBeInstanceOf(Array)
    })
  })

  it('fails get all documents', async () => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGetAll
    const { result, waitForNextUpdate } = renderHook(() => useGetAll(client))
    const getAll = await result.current[0]
    const data = result.current[1]
    const status = result.current[2]

    act(async () => {
      getAll('non-existent-schema')

      // Fails to fetch data and resolves to ERROR
      await waitForNextUpdate()
      expect(data).toBeNull()
      expect(status).toEqual(FaunaStatus.ERROR)
    })
  })
})
