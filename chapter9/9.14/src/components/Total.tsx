import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<CourseParts> = (props: CourseParts) => {
  return (
    <p>
      Number of exercises{" "}
      {props.contents.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total;
