import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const addLike = jest.fn()

  const blog = {
    title: 'title',
    author: 'author',
    likes: 0,
    url: 'url',
    user: {},
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={addLike} removeBlog={() => null}/>
    )
  })

  test('renders by default', () => {
    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')
    expect(component.container).not.toHaveTextContent('0')
    expect(component.container).not.toHaveTextContent('url')
  })

  test('renders after view button clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('title')
    expect(component.container).toHaveTextContent('author')
    expect(component.container).toHaveTextContent('0')
    expect(component.container).toHaveTextContent('url')
  })

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
