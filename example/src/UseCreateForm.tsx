import React, { useState } from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

interface UseCreateFormProps {
  createFunction: Function
}

function UseCreateForm(props: UseCreateFormProps) {
  // All schemas
  const [schema, setSchema] = useState('')
  const [name, setName] = useState('')
  const [data, setData] = React.useState<string>('')

  // Collection
  const [historyDays, setHistoryDays] = useState<number>(30)
  const [ttlDays, setTtlDays] = useState<number>(30)

  // Database
  const [apiVersion, setApiVersion] = useState<string>('2.12')
  const [dbPriority, setDbPriority] = useState<number>(1)

  // Document
  const [collection, setCollection] = useState<string>('')

  // Index
  const [source, setSource] = useState<string>('')
  const [terms, setTerms] = useState<string>('')
  const [values, setValues] = useState<string>('')
  const [unique, setUnique] = useState<boolean>(false)
  const [serialized, setSerialized] = useState<boolean>(true)

  // Function
  const [role, setRole] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const createParamsObject = () => {
    switch (schema) {
      case 'collection':
        return {
          name,
          data: JSON.parse(data),
          history_days: historyDays,
          ttl_days: ttlDays
        }
      case 'database':
        return {
          name,
          api_version: apiVersion,
          priority: dbPriority
        }
      case 'document':
        return {
          name
        }
      case 'index':
        return {
          name,
          source: source.length ? source.split(', ').map(source => source) : [],
          terms: terms.split(', '),
          values: values.split(', '),
          unique,
          serialized
        }
      case 'function':
        // TODO: convert body string to FQL object
        return {
          name
          // role,
          // body
        }

      default:
        break
    }
  }

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

      <fieldset>
        <label htmlFor="data">JSON data:</label>
        <AceEditor
          height="100px"
          width="300px"
          mode="json"
          theme="github"
          onChange={e => setData(e)}
          name="data"
          editorProps={{ $blockScrolling: true }}
        />
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

      {/* Database */}
      {schema === 'database' && (
        <>
          <fieldset>
            <label htmlFor="apiVersion">api_version:</label>
            <input
              type="text"
              id="apiVersion"
              value={apiVersion}
              onChange={e => setApiVersion(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="dbPriority">priority:</label>
            <input
              type="number"
              min="1"
              max="500"
              id="dbPriority"
              value={dbPriority}
              onChange={e => setDbPriority(parseInt(e.target.value))}
            />
          </fieldset>
        </>
      )}

      {/* Document */}
      {schema === 'document' && (
        <>
          <fieldset>
            <label htmlFor="collection">collection:</label>
            <input
              type="text"
              id="collection"
              value={collection}
              onChange={e => setCollection(e.target.value)}
            />
          </fieldset>
        </>
      )}

      {/* Index */}
      {schema === 'index' && (
        <>
          <fieldset>
            <label htmlFor="source">source:</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={e => setSource(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="serialized">serialized</label>
            <input
              type="checkbox"
              id="serialized"
              name="serialized"
              checked={serialized}
              onClick={() => setSerialized(!serialized)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="unique">unique</label>
            <input
              type="checkbox"
              id="unique"
              name="unique"
              checked={unique}
              onClick={() => setUnique(!unique)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="terms">terms:</label>
            <input type="text" id="terms" value={terms} onChange={e => setTerms(e.target.value)} />
          </fieldset>
          <fieldset>
            <label htmlFor="values">values:</label>
            <input
              type="text"
              id="values"
              value={values}
              onChange={e => setValues(e.target.value)}
            />
          </fieldset>
        </>
      )}

      {/* Function */}
      {schema === 'function' && (
        <>
          <fieldset>
            <label htmlFor="body">function body:</label>
            <input
              type="text"
              name="body"
              id="body"
              value={body}
              onChange={e => setBody(e.currentTarget.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="role">role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </fieldset>
        </>
      )}

      <button
        onClick={e => {
          e.preventDefault()
          props.createFunction(schema, createParamsObject(), collection)
        }}
      >
        Create {`${schema}`}
      </button>
    </>
  )
}

export default UseCreateForm
