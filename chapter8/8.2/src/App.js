import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const showWhenLogin = { display: token ? '' : 'none' }
  const hideWhenLogin = { display: token ? 'none' : '' }

  useEffect(() => {
    const token = window.localStorage.getItem('books-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStoreBooks = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStoreBooks.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStoreBooks.allBooks.concat(addedBook) }
      })
    }
    const addedAuthor = { ...addedBook.author, bookCount: 1 }
    const dataInStoreAuthors = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStoreAuthors.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStoreAuthors.allAuthors.concat(addedAuthor) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book is added ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={showWhenLogin} onClick={() => setPage('add')}>add book</button>
        <button style={showWhenLogin} onClick={() => setPage('recommend')}>recommend</button>
        <button style={hideWhenLogin} onClick={() => setPage('login')}>login</button>
        <button style={showWhenLogin} onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommend'}
      />

      <NewBook
        show={page === 'add'}
        setError={setErrorMessage}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setError={setErrorMessage}
        setToken={setToken}
      />

    </div>
  )
}

export default App
