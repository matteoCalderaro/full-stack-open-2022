const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const middlewares = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const cors = require('cors')
//const tokenRouter = require('./controllers/token')

mongoose.connect(config.MONGO_DB_URI)
.then(()=> logger.info(`database connected to: ${config.MONGO_DB_URI}`))
.catch(error=> logger.error(error.message))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middlewares.requestLogger)
app.use(middlewares.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
//app.use('/api/token', tokenRouter)
app.use('/api/comments', commentsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app

