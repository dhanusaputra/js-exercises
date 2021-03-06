import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setGenres([...new Set(result.data.allBooks.map(b => b.genres).reduce((flat, next) => flat.concat(next), []))])
    }
  }, [result.data])

  if (!props.show || result.loading) {
    return null
  }

  const booksToShow = genre ? books.filter(b => b.genres.includes(genre)) : books

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
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
    {genres.map(g =>
      <button key={g} onClick={() => setGenre(g)}>{g}</button>
    )}
    </div>
  )
}

export default Books
