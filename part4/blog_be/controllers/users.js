const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {title:1, url:1, likes:1})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if(!(username && password)) {
    return res.status(400).json({error: 'username and password are mandatory'})
  }
  if(username.length < 3 || password.length < 3) {
    return res.status(400).json({error: 'username and password must have min 3 charachters'})
  }

  const existingUser = await User.findOne({ username })
  if(existingUser) {
    return res.status(400).json({error: 'username must be unique'})
  }

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const newUser = new User({
    name,
    username,
    passwordHash
  })

  const userSaved = await newUser.save()
  res.status(201).json(userSaved)
})




module.exports = usersRouter