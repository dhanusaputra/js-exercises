import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Persons from './components/Person.js'
import PersonForm from './components/PersonForm.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handle={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
