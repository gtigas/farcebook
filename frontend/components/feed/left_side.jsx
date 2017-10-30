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

      <ul>
        <li>
          <i className="fa fa-linkedin-square" aria-hidden="true"></i>
          LinkedIn
        </li>
        <li>
          <i className="fa fa-github" aria-hidden="true"></i>
          Github
        </li>
        <li>
          <i className="fa fa-laptop" aria-hidden="true"></i>
          Website
        </li>
      </ul>
    </div>
  )
}

export default LeftSide;
