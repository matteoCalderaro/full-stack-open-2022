require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')

// MORGAN -----
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
morgan.token('reqBody', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.get('/api/persons', (req,res,next) => {
  Person.find({}).then(persons => res.json(persons)).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if(!person){
        return res.status(404).json({ error: 'person not found' })
      }
      res.send(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then((result) => {
      if(!result){
        return res.status(404).json({ error: 'person not found' })
      }
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req,res,next) => {
  const body = req.body
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save()
    .then(savedNote => res.json(savedNote))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  const { name, number } = req.body
  console.log(typeof number)
  Person
    .findByIdAndUpdate(id,
      { name, number },
      { new: true, runValidators: true, context: 'query' })
    .then(returnedNote => {
      if(!returnedNote){
        return res.status(404).json({ error:'person not found' })
      }
      console.log(returnedNote)
      res.json(returnedNote)
    })
    .catch(error => {
      next(error)
      console.log(error)
    })
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => res.send(`
      <p>Phonebook has info for ${persons.length} persons</p>
      <p>${new Date()}</p>
    `))
    .catch(error => next(error))
})

// middleware --------------
const unknownEndpoint = (req,res) => {
  res.status(404).send('unknown endpoint')
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.name)
  if(error.name === 'CastError'){
    return res.status(400).json({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError'){
    return res.status(400).json({ error : error.message })
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT,() => console.log(`server running on port ${PORT}`))

