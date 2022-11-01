const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async ()=>{
  await User.deleteMany({})
  await helper.initialUser()
})

describe('when there is one user in DB', () => {

  test('all users are retrieved from DB', async () => {
    const usersAtStart = await helper.usersInDb()
    
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('adding new user', () => {

  test('succeeds with valid data', async () => {
  const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      name: 'First User',
      username: 'first',
      password: '123'
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length +1)
  })

  test('fails if username is missing', async () => {
    newUser = {
      password : '123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username and password are mandatory')
  })

  test('fails if password is missing', async () => {
    newUser = {
      username : 'test'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username and password are mandatory')
  })

  test('fails if username is shorter then 3 charachters', async () => {
    newUser = {
      username : 'te',
      password : '123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username and password must have min 3 charachters')
  })

  test('fails if password is shorter then 3 charachters', async () => {
    newUser = {
      username : 'test',
      password : '12'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username and password must have min 3 charachters')
  })

  test('fails if username is not unique', async () => {
    newUser = {
      username : 'root',
      password : '123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('username must be unique')
  })
  
})

afterAll(()=>{
  mongoose.connection.close()
})