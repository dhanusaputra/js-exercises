import React, { useState } from 'react'

import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic text="average" value={good - bad / (good + neutral + bad)} />
        <Statistic text="positive" value={100 * (good / (good + neutral + bad))} unit="%" />
      </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
