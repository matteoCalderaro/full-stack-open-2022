const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

// const cors = require('cors')
// app.use(cors())

// MORGAN -----
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
morgan.token('reqBody', (req, res) => { 
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const generateId = () => {
    return Math.floor(Math.random() * 1000 + 5)
  }
  const body = req.body
  if(!body.name || !body.number) {
    return res.status(400).json({error :'name or number missing'})
  }
  if(persons.find(p => p.name === body.name)) {
    return res.status(400).json({error : 'name must be unique'})
  }
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})


// GET (/info) ------------------------
app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
      <p>Phonebook has info for ${persons.length}</p>
      <p>${new Date()}</p>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=> console.log(`server running on port ${PORT}`))

