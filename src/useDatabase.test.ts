import useDatabase from './useDatabase'
import faunadb from 'faunadb'
import { renderHook } from '@testing-library/react-hooks'

describe('useDatabase', () => {
  it('returns an instantiated client', () => {
    const { result } = renderHook(() => useDatabase('123'))
    expect(result.current).toBeInstanceOf(faunadb.Client)
    expect(result.current.query).toBeInstanceOf(Function)
    expect(result.current.paginate).toBeInstanceOf(Function)
    expect(result.current.ping).toBeInstanceOf(Function)
  })
})
