const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => console.log(`error connecting to MongoDB: ${error.message}`))

const numberValidators = [
  {
    // Minimum length
    validator: (number) => {
      if (number.length < 9) {
        return false
      }
      return true
    },
    msg: 'minimum 8 digits',
  },
  {
    // Only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number)
    },
    msg: 'only input 00-00.. or 000-00..',
  },
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => {
        return /^[A-Za-z\s]*$/.test(name)
      },
      msg: 'only carachters'
    },
    minLength: [3,'minimum 3 carachters'],
    required :[true, 'is required']
  },
  number: {
    type: String,
    validate: numberValidators,
    required :[true, 'is required']
  }
})

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)