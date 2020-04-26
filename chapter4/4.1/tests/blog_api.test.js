const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title:'aaa',
    author:'bbb',
    url:'ccc.com',
    likes:10,
  },
  {
    title:'ddd',
    author:'eee',
    url:'fff.com',
    likes:20,
  }
]

const user = {
  username: 'admin',
  password: 'admin',
  name: 'admin',
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  let userObject = new User(user)
  await userObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs are returned with id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach (e => expect(e.id).toBeDefined())
})

test('a valid blog can be added', async() => {
  const user = await api.get('/api/users')
  const newBlog = {
    title: 'test',
    author: 'q',
    url: 'aaa.com',
    likes: 5,
    userId: user.body[0].id,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZWE1YjQ5MTcyNjgxYjBiZWVjMjE2MzEiLCJpYXQiOjE1ODc5MTc5OTB9.BR9qtqMJhrCetcotLG16C4-qG8cCGc5w1hUbIj2UiLU')
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('test')
})

test('likes default value is 0', async() => {
  const user = await api.get('/api/users')
  const newBlog = {
    title: 'ccc',
    author: 'q',
    url: '123.com',
    userId: user.body[0].id,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZWE1YjQ5MTcyNjgxYjBiZWVjMjE2MzEiLCJpYXQiOjE1ODc5MTc5OTB9.BR9qtqMJhrCetcotLG16C4-qG8cCGc5w1hUbIj2UiLU')
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('400 when url and title are missing', async() => {
  const user = await api.get('/api/users')
  const newBlog = {
    title: 'aa',
    author: 'q',
    userId: user.body[0].id,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZWE1YjQ5MTcyNjgxYjBiZWVjMjE2MzEiLCJpYXQiOjE1ODc5MTc5OTB9.BR9qtqMJhrCetcotLG16C4-qG8cCGc5w1hUbIj2UiLU')
    .expect(400)
})

test('401 when token not provided', async() => {
  const user = await api.get('/api/users')
  const newBlog = {
    title: 'test',
    author: 'q',
    url: 'aaa.com',
    likes: 5,
    userId: user.body[0].id,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('deletion of a blog', async() => {
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1ZWE1YjQ5MTcyNjgxYjBiZWVjMjE2MzEiLCJpYXQiOjE1ODc5MTc5OTB9.BR9qtqMJhrCetcotLG16C4-qG8cCGc5w1hUbIj2UiLU')
    .expect(204)

  const responseEnd = await api.get('/api/blogs')
  const blogsEnd = responseEnd.body

  expect(blogsEnd).toHaveLength(initialBlogs.length - 1)
})

test('update of a blog', async() => {
  const response = await api.get('/api/blogs')
  const blogToUpdate = response.body[0]

  const newBlog = {
    title: '000'
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  const responseEnd= await api.get('/api/blogs')
  const blogsEnd = responseEnd.body

  const titles = blogsEnd.map(r => r.title)

  expect(titles).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
