import React from 'react'
import faunadb from 'faunadb'
import useFaunaClient from './useFaunaClient'

interface DatabaseProviderProps {
  children: React.ReactNodeArray
}
interface DatabaseHookReturns {
  client: faunadb.Client
  DatabaseContext: React.Context<faunadb.Client>
  DatabaseProvider: React.ReactNode
}

export default function useDatabase(key: string): DatabaseHookReturns {
  const client: faunadb.Client = useFaunaClient(key)
  const DatabaseContext = React.createContext(client)

  const DatabaseProvider = (props: DatabaseProviderProps): React.ReactNode => {
    console.log(props)
    // return <DatabaseContext.Provider value={client}>{props.children}</DatabaseContext.Provider>
    return
  }

  return { client, DatabaseContext, DatabaseProvider }
}
