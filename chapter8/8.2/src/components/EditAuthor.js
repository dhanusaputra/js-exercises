import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

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

  const options = props.authors.map(author => ({ value: author.name, label: author.name }))

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select defaultValue={options[0]} onChange={({ target }) => setName(target)} options={options} />
        <div>born<input type='number' value={born} onChange = {({ target }) => setBorn(target.value)} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
