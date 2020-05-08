import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store
