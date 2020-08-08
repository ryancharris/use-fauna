import React, { useState } from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

interface UseUpdateFormProps {
  updateFunction: Function
}

interface UseUpdateDataParams {
  data: object
  credentials: object
  delegates: object
}

function createParamsObject(params: UseUpdateDataParams): object {
  return {
    ...params.data,
    credentials: params.credentials,
    delegates: params.delegates
  }
}

function UseUpdateForm(props: UseUpdateFormProps) {
  const [schema, setSchema] = useState<string>('collection')
  const [name, setName] = useState<string>('')
  const [refId, setRefId] = useState<string>('')
  const [data, setData] = useState<string>('')

  return (
    <>
      <h2>useUpdate</h2>
      <select
        name="deleteSchema"
        id="deleteSchema"
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
        <option value="role">role</option>
      </select>

      <fieldset>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
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

      {schema === 'document' && (
        <fieldset>
          <label htmlFor="name">refId:</label>
          <input
            type="text"
            name="refId"
            id="refId"
            value={refId}
            onChange={e => setRefId(e.currentTarget.value)}
          />
        </fieldset>
      )}

      <button
        onClick={e => {
          e.preventDefault()
          props.updateFunction(schema, name, createParamsObject(JSON.parse(data)), refId)
        }}
      >
        Update {`${schema}`}
      </button>
    </>
  )
}

export default UseUpdateForm
