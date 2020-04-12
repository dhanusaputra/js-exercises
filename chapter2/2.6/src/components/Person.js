import React from 'react'

const Persons = (props) => {
  return (
    <div>
    {props.persons.map(person =>
      <Person key={person.name} name={person.name} number={person.number} />
    )}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>{props.name} {props.number}</div>
  )
}

export default Persons
