import React from 'react'

const Persons = (props) => {
  return (
    <div>
    {props.persons.map(person =>
      <Person key={person.name} person={person} handleClick={props.handleRemove}/>
    )}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number} <Button value={props.person.id} text="delete" handleClick={props.handleClick} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button value={props.value} onClick={props.handleClick}>{props.text}</button>
  )
}

export default Persons
