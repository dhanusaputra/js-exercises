import React from 'react';

interface Header {
  courseName: string;
}

const Header: React.FC<Header> = (props: Header) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

export default Header;
