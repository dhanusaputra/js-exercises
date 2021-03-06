import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => (
  <>
    <h2>Users</h2>
    <div className='users'>
      <table>
        <tbody>
          <tr><th></th><th>blogs created</th></tr>
          {users.map(user =>
            <tr key={user.username}><td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </>
)

export default Users
