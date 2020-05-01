import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>title:<input id='title' value={newBlog.title} type='text' name='Title' onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/></div>
        <div>author:<input id='author' value={newBlog.author} type='text' name='Author' onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/></div>
        <div>url:<input id='url' value={newBlog.url} type='text' name='Url' onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}

export default BlogForm
