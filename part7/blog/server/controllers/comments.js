const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor


commentsRouter.get('/',async (req, res) => {
    let comments = await Comment.find({}).populate('blog',{title:1,id:1}).populate('user',{username:1})
    res.json(comments)
})

commentsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  
  const token = req.user
  
  if(!token.id){
    res.status(400).json({error :'invalid token'})
  }
  // FIND USER
  const user = await User.findById(token.id)
  // FIND BLOG
  const blog = await Blog.findById(body.id)
  
  if(!blog){return res.status(404).json({error: 'blog not found'})}

  const newComment = await new Comment({
    text: body.text,
    user : user._id,
    username: user.name
  })
  
  await newComment.save()
  // ACTUALIZE COMMENTS ON BLOGS
  blog.comments = blog.comments.concat(newComment._id)
  await blog.save()
  user.comments = user.comments.concat(newComment._id)
  await user.save()

  res.status(201).json(newComment)
})

module.exports = commentsRouter


