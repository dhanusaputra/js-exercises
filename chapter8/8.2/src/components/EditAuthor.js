import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()
    const intBorn = Number(born)

    editAuthor({ variables: { name, born: intBorn } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option defaultValue key='blank' value=''>Choose name here</option>
          {props.authors.map(author => (<option key={author.name} value={author.name}>{author.name}</option>))}
        </select>
        <div>born<input type='number' value={born} onChange = {({ target }) => setBorn(target.value)} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
