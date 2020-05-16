import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (resultMe.data) {
      setFavoriteGenre(resultMe.data.me.favoriteGenre)
    }
  }, [resultMe.data])

  if (!props.show || result.loading || resultMe.loading) {
    return null
  }

  const booksToShow = favoriteGenre ? books.filter(b => b.genres.includes(favoriteGenre)) : books

  return (
    <div>
      <h2>recommendations</h2>
      {favoriteGenre && <p>books in your favorite genre <b>{favoriteGenre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
