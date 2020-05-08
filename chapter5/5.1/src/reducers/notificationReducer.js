const notificationReducer = (state = ['info', null], action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return ['error', action.notif]
  case 'SET_INFO':
    return ['info', action.notif]
  case 'RESET':
    return ['info', null]
  default:
    return state
  }
}

export const setError = notif => {
  return {
    type: 'SET_ERROR',
    notif,
  }
}

export const setInfo = notif => {
  return {
    type: 'SET_INFO',
    notif,
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET',
  }
}

export default notificationReducer
