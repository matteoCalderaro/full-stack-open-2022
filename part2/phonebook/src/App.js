import { useEffect, useState } from 'react'
import personService from './services/person'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons=> setPersons(initialPersons))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicateName = persons.find(p => p.name === newPerson.name)
    if(!duplicateName) {
      personService
        .create(newPerson)
        .then(returnedPerson=> setPersons(persons.concat(returnedPerson)))
    } else {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedName = {...duplicateName, number:newPerson.number}
        personService
          .update(duplicateName.id,changedName)
          .then(returnedPerson => setPersons(persons.map(p=>p.id !== returnedPerson.id ? p : returnedPerson)))
      }
    }
    setNewPerson({ name: "", number: "" })
  }

  const changeInput = (event) => {
    //console.log(event);
    const {name, value} = event.target
    setNewPerson({ ...newPerson, [name]: value });
  }

  const changeFilter = (event) =>{
    setFilter(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll ? persons : persons.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()))

  const remove = (id, name) => {
    window.confirm(`delete ${name} ?`)
    
    personService
      .remove(id)
    setPersons(persons.filter(p=>p.id !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter changeFilter={changeFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        newPerson={newPerson} 
        changeInput={changeInput}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} remove={remove}/>
      </div>
  )
}

export default App
