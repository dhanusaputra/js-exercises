import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    const timeoutId = setTimeout(() => {
      props.removeNotification()
    }, 5000)
    props.changeNotification({
      content: `thou added '${content}'`,
      timeoutId,
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  changeNotification,
  removeNotification,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)

export default ConnectedAnecdoteForm
