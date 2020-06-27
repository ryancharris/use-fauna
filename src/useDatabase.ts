import faunadb from 'faunadb'

export default function useDatabase(faunaKey: string): faunadb.Client {
  return new faunadb.Client({ secret: faunaKey })
}
