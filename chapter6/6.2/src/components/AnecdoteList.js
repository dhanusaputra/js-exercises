import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)

  return(
    <>
      {anecdotes.map(anecdote => 
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() =>
            dispatch(addVote(anecdote.id))
          }
        />
      )}
    </>
  )
}

export default AnecdoteList
