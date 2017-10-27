import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = (props) =>  {
  return (
    <div className='not-found'>
      <h1>This page isn't available</h1>
      <h2>The link you followed may be broken,
          or the page may have been removed.</h2>
      <span>
        <a onClick={props.history.goBack}>Go back to the previous Page</a>
        <Link to='/'>Go to News Feed</Link>
      </span>
    </div>
  )
}

export default NotFound;
