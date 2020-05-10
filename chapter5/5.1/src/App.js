import React, { useState, useEffect } from 'react'
import { BlogView } from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

import { initializeBlogs, createBlog, updateBlog, deleteBlog, createComment } from './reducers/blogReducer'
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
      const users = await usersService.getAll()
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
      const res = await blogService.update(blogObject.id, blogObject)
      dispatch(updateBlog(res))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const handleComment = async (blogId, commentObject) => {
    try {
      const res = await blogService.createComment(blogId, commentObject)
      dispatch(createComment(res))
    } catch (exception) {
      dispatch(setError(exception))
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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
          <Form.Label> password</Form.Label>
          <Form.Control id='password' type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
          <Button variane='primary' id='login-button' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </>
  )

  if (user === null) {
    return loginForm()
  }

  const padding = { padding: 5 }

  return (
    <div className='container'>
      <Router>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <span style={padding}>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
        <h2>blog app</h2>
        <Notification message={notifMessage} />

        <Switch>
          <Route path='/blogs/:id'>
            <BlogView blogs={blogs} addLike={handleUpdate} removeBlog={handleRemove} addComment={handleComment} />
          </Route>
          <Route path='/users/:id'>
            <User users={users} />
          </Route>
          <Route path='/users'>
            <Users users={users} />
          </Route>
          <Route path='/'>
            <Togglable buttonId='create-new-blog-button' buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm createBlog={handleCreate} />
            </Togglable>
            <div className='blogs'>
              <Table striped>
                <tbody>
                  {blogs.map(blog =>
                    <tr key={blog.id}>
                      <td>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </td>
                      <td>
                        {blog.author}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Route>
        </Switch>

      </Router>
    </div>
  )
}

export default App
