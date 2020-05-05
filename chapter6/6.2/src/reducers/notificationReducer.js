const initialNotification = {
  content: null,
  timeoutId: null,
}

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      clearTimeout(state.timeoutId)
      return action.data
    }
    case 'REMOVE_NOTIFICATION': 
      return initialNotification
    default:
      return state
  }
}

export const changeNotification = (data) => {
  return {
    type: 'SET_NOTIFICATION',
    data,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer
