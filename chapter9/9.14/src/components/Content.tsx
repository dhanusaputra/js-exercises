import React from 'react';
import { CourseParts } from '../types';

const Content: React.FC<CourseParts> = (props: CourseParts) => {
  return (
    <div>
      {props.contents.map(content => <p key={content.name}>{content.name} {content.exerciseCount}</p>)}
    </div>
  )
}

export default Content;
