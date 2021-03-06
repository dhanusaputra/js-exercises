import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
      born
      id
    }
    published
    genres
  }
}
`

export const FILTER_BOOKS = gql`
query FILTER_BOOKS($genre: String){
  allBooks(genre: $genre) {
    title
    author {
      name
      born
      id
    }
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      born
      id
      bookCount
    }
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born:Int!){
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    id
    published
    genres
    author {
      name
      born
      id
    }
  }
}
`
