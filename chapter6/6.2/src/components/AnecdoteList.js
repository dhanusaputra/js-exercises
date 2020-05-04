import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))

  return(
    <>
      {anecdotes.map(anecdote => 
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
            handleClick={() => {
              dispatch(addVote(anecdote))
              dispatch(changeNotification(`thou voted '${anecdote.content}'`))
              setTimeout(() => {
                dispatch(removeNotification())
              }, 5000)
            }
          }
        />
      )}
    </>
  )
}

export default AnecdoteList
