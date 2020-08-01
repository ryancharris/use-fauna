import faunadb from 'faunadb'

export default function useCreate(client: faunadb.Client): [Function, string, string] {
  console.log(client)
  return [() => {}, '', '']
}
