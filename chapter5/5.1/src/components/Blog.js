import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

const BlogView = ({ blogs, addLike, removeBlog, addComment }) => {
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

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blog.id, { content: event.target.comment.value })
    event.target.comment.value = ''
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input type='text' name='comment'/>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

export { BlogView }
