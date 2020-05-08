import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'

import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setInfo, setError, resetNotification } from './reducers/notificationReducer'
import { setUser, resetUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notifMessage = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      dispatch(initializeBlogs(blogs))
    }
    fetchBlogs()
  }, [dispatch])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll()
      dispatch(initializeUsers(users))
    }
    fetchUsers()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setError('wrong username or password'))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    dispatch(resetUser())
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      dispatch(createBlog(blog))
      dispatch(setInfo(`a new blog ${blog.title} by ${blog.author} added`))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const handleUpdate = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject)
      dispatch(updateBlog(blogObject))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const handleRemove =  async (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject.id)
        dispatch(deleteBlog(blogObject.id))
      }
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
    setTimeout(() => {
      dispatch(resetNotification())
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
    <Router>
      <h2>blogs</h2>
      <Notification message={notifMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Switch>
        <Route path='/users'>
          <h2>Users</h2>
          <div className='users'>
          </div>
        </Route>
        <Route path='/'>
          <Togglable buttonId='create-new-blog-button' buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={handleCreate} />
          </Togglable>
          <div className='blogs'>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} addLike={handleUpdate} removeBlog={handleRemove}/>
            )}
          </div>
        </Route>
      </Switch>

    </Router>
  )
}

export default App
