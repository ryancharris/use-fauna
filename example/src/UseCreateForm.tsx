import React, { useState, useEffect } from 'react'

interface UseCreateFormProps {
  createFunction: Function
}

function UseCreateForm(props: UseCreateFormProps) {
  const [schema, setSchema] = useState('')
  const [name, setName] = useState('')
  const [historyDays, setHistoryDays] = useState<number>(30)
  const [ttlDays, setTtlDays] = useState<number>(30)
  // const [data, setData] = useState({})
  // const [permissions, setPermissions] = useState({})

  // TODO: Add JSON editor for object params
  return (
    <>
      <h2>useCreate</h2>
      <select
        name="createSchema"
        id="createSchema"
        value={schema}
        onChange={e => {
          setSchema(e.target.value)
        }}
      >
        <option value="collection">collection</option>
        <option value="database">database</option>
        <option value="document">document</option>
        <option value="function">function</option>
        <option value="index">index</option>
      </select>

      {/* All schemas */}
      <fieldset>
        <label htmlFor="name">name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
      </fieldset>

      {/* Collections */}
      {schema === 'collection' && (
        <>
          <fieldset>
            <label htmlFor="historyDays">history_days:</label>
            <input
              type="number"
              id="historyDays"
              value={historyDays}
              onChange={e => setHistoryDays(parseInt(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="ttlDays">ttl_days:</label>
            <input
              type="number"
              id="ttlDays"
              value={ttlDays}
              onChange={e => setTtlDays(parseInt(e.target.value))}
            />
          </fieldset>
        </>
      )}

      <button
        onClick={e => {
          e.preventDefault()
          props.createFunction(schema, {
            name: name,
            history_days: historyDays,
            ttl_days: ttlDays
          })
        }}
      >
        Create {schema}
      </button>
    </>
  )
}

export default UseCreateForm