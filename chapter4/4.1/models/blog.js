const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  author: String,
  url: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    comment: {
      type: String,
    },
  }],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

