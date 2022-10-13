import { useEffect, useState } from 'react'
import personService from './services/person'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  console.log(message)
  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons=> setPersons(initialPersons))
  },[])
  useEffect(()=> {
    const timer = setTimeout(()=>setMessage(null),2000)
    return () => {
      clearTimeout(timer);
    };
  },[message])

  const addPerson = (event) => {
    event.preventDefault()
    const existedPerson = persons.find(p => p.name === newPerson.name)
    if(!existedPerson) {
      personService
        .create(newPerson)
        .then(returnedPerson=> {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added '${newPerson.name}'`)
        })
    } else {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personNewNumber = {...existedPerson, number:newPerson.number}
        personService
          .update(existedPerson.id,personNewNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p=>p.id !== returnedPerson.id ? p : returnedPerson))
            setMessage(`The number of '${existedPerson.name}' is changed`)
          })
          .catch(err=>{
            setMessage(`Information of ${existedPerson.name} has already been removed from server`)
            setPersons(persons.filter(p=>p.id !== existedPerson.id))
          })
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
    if(window.confirm(`delete ${name} ?`)){
      personService
        .remove(id)
        .then(setPersons(persons.filter(p=>p.id !== id)))
        setMessage(`${name} has been removed`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
