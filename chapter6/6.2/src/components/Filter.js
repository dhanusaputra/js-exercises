import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={(event) => props.changeFilter(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter,
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps,
)(Filter)

export default ConnectedFilter
