import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useCreate from './useCreate'

describe('useCreate', () => {
  it('successfully creates Collection', async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useCreate
    const { result, waitForNextUpdate } = renderHook(() => useCreate(client))
    const createFunction = result.current[0]
    const createData = result.current[1]
    const createStatus = result.current[2]

    expect(createFunction).toBeInstanceOf(Function)
    expect(createData).toBeNull()
    expect(createStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      createFunction('collection', { name: 'my-collection' })

      await waitForNextUpdate()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Database', async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useCreate
    const { result, waitForNextUpdate } = renderHook(() => useCreate(client))
    const createFunction = result.current[0]
    const createData = result.current[1]
    const createStatus = result.current[2]

    expect(createFunction).toBeInstanceOf(Function)
    expect(createData).toBeNull()
    expect(createStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      createFunction('database', { name: 'my-database' })

      await waitForNextUpdate()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Document', async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useCreate
    const { result, waitForNextUpdate } = renderHook(() => useCreate(client))
    const createFunction = result.current[0]
    const createData = result.current[1]
    const createStatus = result.current[2]

    expect(createFunction).toBeInstanceOf(Function)
    expect(createData).toBeNull()
    expect(createStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      createFunction('document', { name: 'my-document' }, 'ui-test')

      await waitForNextUpdate()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Index', async () => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    const client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useCreate
    const { result, waitForNextUpdate } = renderHook(() => useCreate(client))
    const createFunction = result.current[0]
    const createData = result.current[1]
    const createStatus = result.current[2]

    expect(createFunction).toBeInstanceOf(Function)
    expect(createData).toBeNull()
    expect(createStatus).toBe(FaunaStatus.NOT_LOADED)

    act(async () => {
      createFunction('index', { name: 'my-index', source: ['ui-test'] })

      await waitForNextUpdate()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await waitForNextUpdate()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })
})
