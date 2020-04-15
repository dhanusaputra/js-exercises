import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import Persons from './components/Person.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/person.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson =>{
        setPersons(initialPerson)
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
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
        personService
          .update(changedPerson.id, personObject).then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
        setNewName('')
        setNewNumber('')
        return
      }
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (event) => {
    personService
      .get(event.target.value)
      .then(person => {
        if (window.confirm(`Delete ${person[0].name} ?`)) {
          personService
            .remove(person[0].id)
            .then( () => {
              setPersons(persons.filter(n => n.id !== person[0].id))
            })
        }
      })
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
      <Persons persons={personsToShow} handleRemove={removePerson}/>
    </div>
  )
}

export default App
