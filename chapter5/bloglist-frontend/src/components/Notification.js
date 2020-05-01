import React from 'react'

const Notification = ({ message }) => {
  if (message[1] === null) {
    return null
  }
  return (
    <div className={message[0]}>
      {message[1]}
    </div>
  )
}

export default Notification
