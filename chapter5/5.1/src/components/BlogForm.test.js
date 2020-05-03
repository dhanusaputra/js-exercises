import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<NoteForm />', () => {
  test('form calls the right details', () => {
    const handleCreate = jest.fn()

    const component = render(
      <BlogForm createBlog={handleCreate} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'title' }
    })
    fireEvent.change(author, {
      target: { value: 'author' }
    })
    fireEvent.change(url, {
      target: { value: 'url' }
    })
    fireEvent.submit(form)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0].title).toBe('title')
    expect(handleCreate.mock.calls[0][0].author).toBe('author')
    expect(handleCreate.mock.calls[0][0].url).toBe('url')
  })
})
