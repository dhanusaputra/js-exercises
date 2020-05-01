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

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
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
    window.localStorage.removeItem('loggedBlogAppUser')
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
      setNotifMessage(['error', exception])
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
          username<input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password<input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
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
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />  
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App
