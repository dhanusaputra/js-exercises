import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams, useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

const BlogView = ({ blogs, addLike, removeBlog }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const history = useHistory()

  const handleLike = () => {
    addLike({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = () => {
    removeBlog(blog)
    history.push('/')
  }

  if (!blog){
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>{blog.url}</div>
      <div>likes <span data-cy='likes'>{blog.likes}</span> <button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div><button onClick={handleRemove}>remove</button></div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export { Blog, BlogView }
