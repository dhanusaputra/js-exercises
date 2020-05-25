import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<CoursePart> = (props: {part: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.name) {
    case 'Fundamentals':
      return ('lul')
    case 'Using props to pass data':
      return ('lul')
    case 'Deeper type usage':
      return ('lul')
    default:
      assertNever(props);
  }
}

export default Part;
