const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/',async (req, res) => {
    let blog = await Blog.find({}).populate('isLikedBy', {name: 1}).populate('user', {name: 1}).populate('comments')

    res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  let token = req.token

  const tokenResolved = jwt.verify(token, process.env.SECRET)

  if(!tokenResolved.id){
    res.status(401).json({error: 'invalid token'})
  }
  const user = await User.findById(tokenResolved.id)
  console.log(user._id);

  const newBlog = await new Blog({
    title: body.title,
    text: body.text,
    url: body.url,
    likes: body.likes || 0,
    user : user._id,
  }).populate('user')
  
  await newBlog.save()
  
  user.blogsPublished = user.blogsPublished.concat(newBlog._id)
  await user.save()
  res.status(201).json(newBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id
  const token = req.user
  
  if(!token.id){
    res.status(400).json({error :'invalid token'})
  }
  
  const blog = await Blog.findById(id)

  if(!blog) {
    return res.status(404).json({error: 'blog not found'})
  }

  if(token.id === blog.user._id.toString()) {

      // DELETE BLOG
      await Blog.findByIdAndRemove(id)
  
      // DELETE COMMENTS
      for(let i = 0; i < blog.comments.length; i++) {
        await Comment.findByIdAndRemove(blog.comments[i].toString())
      }
      res.status(204).end()
  } else {
    res.status(401).json({error : "you cannot delete this blog"})
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  let token = req.token
  
  const tokenResolved = jwt.verify(token, process.env.SECRET)
  let userIdFromToken = tokenResolved.id

  if(!userIdFromToken){
    res.status(401).json({error: 'invalid token'})
  }

  const user = await User.findById(userIdFromToken)
  const blog = await Blog.findById(id)
  //LIKES-----------------------------------------
  let isFollower = blog.isLikedBy.map(b=>b.toString()).includes(userIdFromToken)
  
  if(isFollower) {
    blog.isLikedBy = blog.isLikedBy.filter(f=>f.toString() !== userIdFromToken)
    user.blogsLiked = user.blogsLiked.filter(f=>f.toString() !== id)
  } else {
    blog.isLikedBy = blog.isLikedBy.concat(userIdFromToken)
    user.blogsLiked = user.blogsLiked.concat(id)
  }
  await user.save()
  
  const response = await Blog.findByIdAndUpdate(
    id,
    {
      isLikedBy:blog.isLikedBy,
      likes:blog.isLikedBy.length,
    },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user',{name:1})
  res.json(response)
})

module.exports = blogsRouter


