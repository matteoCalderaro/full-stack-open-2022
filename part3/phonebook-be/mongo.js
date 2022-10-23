const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.jdxqz.mongodb.net/fullstackOpen-command-line-db?retryWrites=true&w=majority`

if(process.argv.length < 3) {
  console.log('Please provide a password: node mongoose.mongo.js <password>')
  process.exit(1)
}

mongoose.connect(url)
  .then(() => console.log(`database connected to ${url}`))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name : String,
  number : Number
})

const Person = mongoose.model('Person',personSchema)

const newPerson = new Person({
  name: name,
  number: number
})

if(process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.map(p => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.disconnect()
    })
}

if(process.argv.length > 3) {
  newPerson.save()
    .then(() => {
      console.log(
        `added ${name} number ${number} to phonebook`
      )
      mongoose.disconnect()
    })
}





