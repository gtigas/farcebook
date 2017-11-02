import React from 'react';
import { Link } from 'react-router-dom';

const LeftSide = ({ currentUser }) => {
  const { id, profile_picture_url, fullName } = currentUser;
  return (
    <div className='main-left'>
      <Link to={`/users/${id}`} className='flex-row' >
        <img src={profile_picture_url}
              width="22px"
              height="22px"
              className='circle-thumb' />
        {fullName}
      </Link>
      <br></br>
      <Link to='/' className='flex-row left-nav' id='news-feed' >
        <i className="fa fa-newspaper-o" aria-hidden="true"></i>
        News Feed
      </Link>
      <span id='not-implemented'>
        <i className="fa fa-commenting"
           aria-hidden="true"
           style={ {fontSize: '15px'}}>
        </i>
        Messenger
      </span>

      <ul>
        <li>Connect With Glenn</li>
        <li>
          <a href='https://www.linkedin.com/in/glenn-tigas/'>
          <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            LinkedIn
          </a>
        </li>
        <li>
          <a href='https://github.com/gtigas'>
          <i className="fa fa-github" aria-hidden="true"></i>
            Github
          </a>
        </li>
        <li>
          <a href='https://google.com'>
            <i className="fa fa-laptop" aria-hidden="true"></i>
            Website
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LeftSide;
