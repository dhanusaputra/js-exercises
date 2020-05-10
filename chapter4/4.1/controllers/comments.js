const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/user')

commentsRouter.post('/:id/comments', async (request, response) => {
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

module.exports = commentsRouter
