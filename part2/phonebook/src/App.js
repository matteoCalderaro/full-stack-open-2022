import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: "", phone: "" });
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=> setPersons(response.data))
  },[])

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
