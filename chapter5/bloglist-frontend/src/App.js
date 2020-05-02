import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notifMessage, setNotifMessage] = useState(['info', null])
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  const sortedBlogsByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( sortedBlogsByLikes(blogs) )
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login ({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMessage(['error', 'wrong username or password'])
      setTimeout(() => {
        setNotifMessage(['info', null])
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotifMessage(['info', `a new blog ${blog.title} by ${blog.author} added`])
    } catch (exception) {
      setNotifMessage(['error', exception.response.data.error])
    }
    setTimeout(() => {
      setNotifMessage(['info', null])
    }, 5000)
  }

  const handleUpdate = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(sortedBlogsByLikes(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)))
    } catch (exception) {
      setNotifMessage(['error', exception.response.data.error])
    }
    setTimeout(() => {
      setNotifMessage(['info', null])
    }, 5000)
  }

  const handleRemove =  async (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      }
    } catch (exception) {
      setNotifMessage(['error', exception.response.data.error])
    }
    setTimeout(() => {
      setNotifMessage(['info', null])
    }, 5000)
  }

  const loginForm = () => (
    <>
      <h2>login to application</h2>
      <Notification message={notifMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username<input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password<input id='password' type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={notifMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonId='create-new-blog-button' buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      <div className='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={handleUpdate} removeBlog={handleRemove}/>
        )}
      </div>
    </>
  )
}

export default App
