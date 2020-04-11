import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const anecdotesLength = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [vote, setVote]  = useState(Array(anecdotesLength).fill(0))

  const getMostVote = (points) => points.indexOf(Math.max(...points))

  const handleClickVote = (points, key) => {
    const copy = [...points]
    copy[key] += 1
    setVote(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <Display value={vote[selected]} />
      <Button text="vote" handleClick={() => handleClickVote(vote, selected)} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * anecdotesLength))} />
      <Header text="Anecdote with most votes" />
      <div>{props.anecdotes[getMostVote(vote)]}</div>
      <Display value={vote[getMostVote(vote)]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Display = ({value}) => {
  return (
    <div>has {value} votes</div>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
} 

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
