import { useState, useEffect } from 'react';
import axios from 'axios';

// axios
//   .get('http://localhost:3001/persons')
//   .then(response => {
//     const persons = response.data
//     console.log(persons)
//   })
const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, nameValue, nameOnChange, numberValue, numberOnChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

 

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response) 
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
  const existingPerson = persons.find(person => person.name === newName)
  if (existingPerson) {
    if (existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        axios.put(`http://localhost:3001/persons/${existingPerson.id}`, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  } else {
    const personObject = {
      name: newName,
      number: newNumber,
    }
    axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3> 
      <Persons persons={persons} handleDelete={deletePerson} />
    </div>
  )
}

export default App
