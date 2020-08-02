import React, { useState } from 'react'

interface UseDeleteFormProps {
  deleteFunction: Function
}

function UseDeleteForm(props: UseDeleteFormProps) {
  const [schema, setSchema] = useState('collection')
  const [name, setName] = useState<string>('')
  const [refId, setRefId] = useState<string>('')

  return (
    <>
      <h2>useDelete</h2>
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
        <option value="index">index</option>
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
          props.deleteFunction(schema, name, refId)
        }}
      >
        Delete {`${schema}`}
      </button>
    </>
  )
}

export default UseDeleteForm
