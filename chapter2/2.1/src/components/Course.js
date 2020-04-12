import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <HeaderCourse course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const HeaderCourse = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = ({parts}) => {
  return (
    <b>total of {parts.map(part => part.exercises).reduce((a, b) => a + b)} exercises</b>
  )
}

export default Course
