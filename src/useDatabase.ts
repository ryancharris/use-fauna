import faunadb from 'faunadb'

export default function useDatabase(faunaKey: string) {
  return new faunadb.Client({ secret: faunaKey })
}
