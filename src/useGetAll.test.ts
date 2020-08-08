import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useGetAll from './useGetAll'

describe('useGetAll', () => {
  let client: faunadb.Client = new faunadb.Client()
  let getAllFunction: Function = () => {}
  let getAllData: null | object = null
  let getAllStatus: string = ''
  let hookUpdateFunction: Function = () => {}

  beforeAll(() => {
    // Instantiate access to DB
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useGetAll
    const { result, waitForNextUpdate } = renderHook(() => useGetAll(client))
    getAllFunction = result.current[0]
    getAllData = result.current[1]
    getAllStatus = result.current[2]
    hookUpdateFunction = waitForNextUpdate

    expect(getAllFunction).toBeInstanceOf(Function)
    expect(getAllData).toBeNull()
    expect(getAllStatus).toBe(FaunaStatus.NOT_LOADED)
  })

  it('gets all collections successfully', async () => {
    act(async () => {
      getAllFunction('databases')

      await hookUpdateFunction()
      expect(getAllData).toBeNull()
      expect(getAllStatus).toEqual(FaunaStatus.NOT_LOADED)

      await hookUpdateFunction()
      expect(getAllStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(status).toEqual(FaunaStatus.LOADED)
      expect(getAllData).toBeDefined()
      expect(getAllData).toBeInstanceOf(Array)
    })
  })

  it('fails get all documents', async () => {
    act(async () => {
      getAllFunction('non-existent-schema')

      // Fails to fetch data and resolves to ERROR
      await hookUpdateFunction()
      expect(getAllData).toBeNull()
      expect(getAllStatus).toEqual(FaunaStatus.ERROR)
    })
  })
})
