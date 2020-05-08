const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return  [...state, action.data]
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data :  blog).sort((a, b) => b.likes - a.likes)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog,
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id,
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  }
}

export default blogReducer
