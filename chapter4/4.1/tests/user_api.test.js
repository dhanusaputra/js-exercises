const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('get all return the correct data', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(users.body).toHaveLength(1)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'dhanu',
      name: 'dhanusaputra',
      password: 'dhanu',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'root',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  
  test('400 when username is not given', async() => {
    const newUser = {
      password: 'acb',
      name: 'b',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` is required')
  })

  test('400 when password is not given', async() => {
    const newUser = {
      username: 'aa',
      name: 'b'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password missing or length < 3')
  })

  test('400 when password length is less than 3', async() => {
    const newUser = {
      username: 'aa',
      name: 'b',
      password: 'aa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password missing or length < 3')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
