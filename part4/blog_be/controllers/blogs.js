const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/',async (req, res) => {
    let blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  let token = req.token
// jwt.verify decodes the token. It throws errors with name JsonWebTokenError", e.g. "jwt must be provided" (no token passed), "invalid signature" (charachter missing), "token expired"....If it is everything ok, it returns the Object which the token was based on.
  const tokenResolved = jwt.verify(token, process.env.SECRET)
  //console.log(tokenResolved);
//if the id hasn't been passed from model "login"
  if(!tokenResolved.id){
    res.status(401).json({error: 'invalid token'})
  }
  const user = await User.findById(tokenResolved.id)

  const newBlog = await new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }).save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  res.status(201).send(newBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id
  //const token = req.token
  const tokenResolved = req.user
  if(!tokenResolved.id){
    res.status(400).json({error :'invalid token'})
  }
  const blog = await Blog.findById(id)
  if(!blog) {
    res.status(404).json({error: 'blog not found'})
  }
  const userid = tokenResolved.id

  if(userid === blog.user._id.toString()){
    const response = await Blog.findByIdAndRemove(id)
    if(response) {
      res.status(204).end()
    } 
  } else {
    res.status(401).json({error : "you cannot delete this blog"})
  }
})







blogsRouter.put('/:id', async (req, res) => {
  const {title,url,likes} = req.body
  const id = req.params.id
  const response = await Blog.findByIdAndUpdate(
    id,
    {title,url,likes},
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(response)
})

module.exports = blogsRouter


