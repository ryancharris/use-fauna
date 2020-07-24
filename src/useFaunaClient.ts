import faunadb from 'faunadb'

export default function useFaunaClient(faunaKey: string): faunadb.Client {
  return new faunadb.Client({ secret: faunaKey })
}
