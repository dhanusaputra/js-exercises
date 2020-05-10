const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments', { content: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })

  if (!(blog.url && blog.title)) {
    response.status(400).end()
  }     

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (blog.user) {
    if (!request.token || decodedToken.id !== blog.user.toString()) {
      return response.status(403).json({ error: 'deletion by other is not allowed' })
    }
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    author: request.body.author,
    comments: request.body.comments,
  } 
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments', { content: 1, id: 1 })

  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  
  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })

  if (!comment.content) {
    response.status(400).end()
  }     

  const result = await comment.save()
  blog.comments = blog.comments.concat(result._id)
  await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter
