import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE': 
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data).sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
  default:
   return state 
  }
}

export const addVote = (object) => {
  return async dispatch => {
    const id = object.id
    const changedAnecdote = {...object, votes: object.votes + 1}
    const response = await anecdoteService.update(id, changedAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: response,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
  dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
  })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
