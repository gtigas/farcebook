import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = (props) =>  {
  return (
    <div className='not-found-container'>
      <div className='not-found flex-col'>
        <h1>This page isn't available</h1>
        <h2>The link you followed may be broken,
          or the page may have been removed.</h2>
          <img src='https://s3.us-east-2.amazonaws.com/farcebook-pro/404.png'></img>
          <span>
            <a onClick={props.history.goBack}>Go back to the previous Page</a>
            <Link to='/'>Go to News Feed</Link>
          </span>
        </div>
      </div>

  )
}

export default NotFound;
