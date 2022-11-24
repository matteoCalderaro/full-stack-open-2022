const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, res, next) =>{
    logger.info('Method: ' , request.method);
    logger.info('Path: ' , request.path);
    logger.info('Body : ' , request.body);
    next()
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } 
  next()
  }

const userExtractor = (request, response, next) => {
  request.user = jwt.verify(request.token,process.env.SECRET)
  next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send('unknown endpoint')
}

const errorHandler = (error,req,res,next) => {
  if(error.name === 'ValidationError') {
    logger.info(error.message)
    return res.status(400).json({
      error: error.message
    })
  }  else if(error.name === 'CastError') {
    logger.error(error.message)
    return res.status(400).json({
      error: 'malformatted id'
    })
  }
  else if(error.name === 'JsonWebTokenError'){
    logger.error(error.message)
    return res.status(400).json({
      error: error.message
    })
  }
  else if(error.name === 'TokenExpiredError'){
    logger.error(error.message)
    return res.status(400).json({
      error: 'token expired'
    })
  }
  logger.error(error.message)

  next(error)
  }
 

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
