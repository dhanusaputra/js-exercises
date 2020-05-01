import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleLike = () => {
    addLike({ ...blog, likes: blog.likes + 1 })
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => setBlogVisible(!blogVisible)}>view</button></div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
        <div><button onClick={() => removeBlog(blog)}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
