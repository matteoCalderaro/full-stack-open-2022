import { useState } from 'react'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find(p => p.name === newPerson.name)
    if(duplicate){
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewPerson({ name: "", phone: "" })
  }

  const changeInput = (event) => {
    
    const {name, value} = event.target
    
    console.log(name,value);
    setNewPerson({ ...newPerson, [name]: value });
  }

  const changeFilter = (event) =>{
    setFilter(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll ? persons : persons.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()))

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
      <Persons personsToShow={personsToShow}/>
      </div>
  )
}

export default App
