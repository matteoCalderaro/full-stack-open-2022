const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username})
  // if bcrypt.compare doesn't receive a parameter (e.g. user.passwordHash) it throws an error
  let passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password,user.passwordHash)
  if(!user) {
    res.status(400).json({error: 'invalid username'})
  } else if(!passwordCorrect) {
      res.status(400).json({error: 'invalid password'})
    } else {
      const userForToken = {
        username: user.username,
        id: user._id
      }
    
      const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        // { expiresIn: '10s'}
        )

      res.status(200).json({token, username:user.username, name: user.name})
    }
})

module.exports = loginRouter