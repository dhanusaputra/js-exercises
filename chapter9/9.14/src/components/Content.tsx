import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<CoursePart[]> = (props: {contents: CoursePart[]}) => {
  return (
    <div>
      {props.contents.map(content => <Part key={content.name} part={content}  />)}
    </div>
  )
}

export default Content;
