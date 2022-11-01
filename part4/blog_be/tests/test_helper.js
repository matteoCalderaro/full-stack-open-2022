const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require('bcrypt')

initialArray = [
  {
    title: "Sono uno sviluppatore",
    author: "Matteo Calderaro",
    url: 'https://it.wikipedia.org/wiki/Sviluppatore',
    likes: 10
  },
  {
    title: "Sono una giornalista",
    author: "Viktoria Eizenhoefer",
    url: 'https://it.wikipedia.org/wiki/Giornalista',
    likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const notExistingId = async () => {
  const newBlog = new Blog({
    title: 'will be removed',
    url: 'http://www.test.com'
  })
  await newBlog.save()
  await newBlog.remove()
  return newBlog._id.toString()
}

const usersInDb =  async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUser = async () => {
  const passwordHash = await bcrypt.hash('password',10)
  const newUser = new User({
    name: 'Usert test',
    username: 'root',
    passwordHash
  })
  return newUser.save()
}

module.exports = {initialArray, blogsInDb, notExistingId, usersInDb, initialUser}