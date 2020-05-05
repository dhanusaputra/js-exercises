import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = (props) => {
  return (
    <div key={props.id}>
      <div>
        {props.content}
      </div>
      <div>
        has {props.votes}
        <button onClick={props.handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  return(
    <>
      {props.anecdotes.map(anecdote => 
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
            handleClick={() => {
              props.addVote(anecdote)
              const timeoutId = setTimeout(() => {
                props.removeNotification()
              }, 5000)
              props.changeNotification({
                content: `thou voted '${anecdote.content}'`, 
                timeoutId,
              })
            }
          }
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  changeNotification,
  addVote,
  removeNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default ConnectedAnecdoteList
