import { renderHook, act } from '@testing-library/react-hooks'
import faunadb from 'faunadb'

import { FaunaStatus } from './constants'

import useFaunaClient from './useFaunaClient'
import useCreate from './useCreate'

describe('useCreate', () => {
  let client: faunadb.Client = new faunadb.Client()
  let createFunction: Function = () => {}
  let createData: null | object = null
  let createStatus: string = ''
  let hookUpdateFunction: Function = () => {}

  beforeAll(() => {
    // Instantiate client
    const { result: db } = renderHook(() =>
      useFaunaClient('fnADxo6lvWACEnAmge1HiGgF9FmI48Ok75ij_Yfk')
    )
    client = db.current
    expect(client).toBeInstanceOf(faunadb.Client)

    // Render useCreate
    const { result, waitForNextUpdate } = renderHook(() => useCreate(client))
    createFunction = result.current[0]
    createData = result.current[1]
    createStatus = result.current[2]
    hookUpdateFunction = waitForNextUpdate

    expect(createFunction).toBeInstanceOf(Function)
    expect(createData).toBeNull()
    expect(createStatus).toBe(FaunaStatus.NOT_LOADED)
  })

  it('successfully creates Collection', async () => {
    act(async () => {
      createFunction('collection', { name: 'my-collection' })

      await hookUpdateFunction()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Database', async () => {
    act(async () => {
      createFunction('database', { name: 'my-database' })

      await hookUpdateFunction()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Document', async () => {
    act(async () => {
      createFunction('document', { name: 'my-document' }, 'ui-test')

      await hookUpdateFunction()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })

  it('successfully creates Index', async () => {
    act(async () => {
      createFunction('index', { name: 'my-index', source: ['ui-test'] })

      await hookUpdateFunction()
      expect(createData).toBeNull()
      expect(createStatus).toEqual(FaunaStatus.LOADING)

      await hookUpdateFunction()
      expect(createStatus).toEqual(FaunaStatus.LOADED)
      expect(createData).toBeDefined()
      expect(createData).toBeInstanceOf(Object)
    })
  })
})
