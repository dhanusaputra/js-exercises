const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION': 
      return null
    default:
      return state
  }
}

export const changeNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    notification: null,
  }
}

export default notificationReducer
