const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')


beforeEach(async ()=>{
  await Blog.deleteMany({})

  const objs = helper.initialArray.map(b => new Blog(b))
  for(let blog of objs ) {
    await blog.save()
  }

  await User.deleteMany({})
  await helper.initialUser()

})
describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initialArray.length)
  })

  test('blogs id is named id', async () => {
    const posts = await api
      .get('/api/blogs')
    
    for (let post of posts.body) {
      expect(post.id).toBeDefined()
    }
  })
})

describe('addition of a new blog', () => {
  let token = null
  beforeEach( async () => {
    let newUser = {
        username:'usernameFake',
        password:'passwordFake'
      }

    let response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      
    expect(response.body.username).toBe('usernameFake')
    const {username} = response.body

    response = await api
      .post('/api/login')
      .send({username, password:'passwordFake'})
      .expect(200)

    token = response.body.token
  })

  test('an authorized user can add blogs with valid data', async () => {

    let newBlog = {
      title : 'title test',
      author: 'author test',
      url : 'url test'
    }

    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length +1)
  })

  test('user is assigned the created blog', async () => {
    
    let newBlog = {
      title : 'title test',
      author: 'author test',
      url : 'url test'
    }

    response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    let userDb = await User.findOne({username:'usernameFake'})
    const blogsPerUser = userDb.blogs.map(b=> b._id.toString())
    expect(blogsPerUser).toContain(response.body.id)
  })
  
  test('blogs without the property likes return with 0 likes', async () => {

    let newBlog = {
      title : 'title test',
      author: 'author test',
      url : 'url test'
    }

    response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    expect(response.body.likes).toBe(0)
  })
  
  test('backend responds with status 400 if title is missing', async () => {
    const initialBlogs = await helper.blogsInDb()
  
    const newPost = {
      url: 'https://it.wikipedia.org/wiki/Lingua_tedesca',
      author : "sconosciuto",
      likes : 500
    }
  
    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  
    const blogsAtTheEnd = await helper.blogsInDb()
    expect(blogsAtTheEnd).toHaveLength(initialBlogs.length)
  })
  
  test('backend responds with status 400 if url is missing', async () => {
    const initialBlogs = await helper.blogsInDb()
  
    const newPost = {
      title : 'titolo interessante',
      author : "sconosciuto",
      likes : 500
    }
  
    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  
    const blogsAtTheEnd = await helper.blogsInDb()
    expect(blogsAtTheEnd).toHaveLength(initialBlogs.length)
  }) 
})

describe('deletion of a blog', () => {
  let token = null
  beforeEach(async () => {
    let newUser = {
        username:'usernameFake',
        password:'passwordFake'
      }
      let response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
      
      expect(response.body.username).toBe('usernameFake')
      const {username} = response.body
  
      response = await api
        .post('/api/login')
        .send({username, password:'passwordFake'})
        .expect(200)

      token = response.body.token
  })

  test('an authorized user can delete his blog with valid id', async () => {

    let newBlog = {
      title : 'title test',
      author: 'author test',
      url : 'url test'
    }

    response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogId = response.body.id

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {  

    const validNonExistingId = await helper.notExistingId()
    response = await api
      .delete(`/api/blogs/${validNonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

    expect(response.body.error).toBe('blog not found')
  })

  test('fails with statuscode 400 if id is invalid', async () => {

    const idFake = 'hello'
    response = await api
      .delete(`/api/blogs/${idFake}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

      expect(response.body.error).toBe('malformatted id')
  })
})

describe('updating a blog', () => {
  test('the property likes can be updated', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]
    const id = blogToUpdate.id
  
    const response = await api
      .put(`/api/blogs/${id}`)
      .send({likes: 50})
      .expect(200)
  
    //console.log(response.body);
      
    const blogsAtTheEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtTheEnd[0]
    expect(blogUpdated.likes).toBe(50) 
  })
})

afterAll(()=>{
  mongoose.connection.close()
})