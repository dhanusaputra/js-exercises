const lodash = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  blogs = blogs.map(blog => lodash.pick(blog, 'title', 'author', 'likes'))
  return blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current, {})
}

const mostBlogs = (blogs) => {
  const groups = lodash.chain(blogs).groupBy('author').map((value, key) => ({author: key, blogs: value.length})).value()
  return groups.reduce((prev, current) => prev.blogs > current.blogs ? prev : current, {})
}

const mostLikes = (blogs) => {
  const groups = lodash.chain(blogs).groupBy('author').map((value, key) => ({author: key, likes: value.reduce((acc, v) => acc + v.likes, 0)})).value()
  return groups.reduce((prev, current) => prev.likes > current.likes ? prev : current, {})
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
