import React from 'react';
import { Link } from 'react-router-dom'


const ProfileHeaderNav = ({ id, openTab }) => {
  return (
    <div id='profile-header-nav'>
      <ul className='pos-rel'>
        <Link to={`/users/${id}`}>
          <li className={openTab === 'timeline' ? 'selected' : ''}>
              Timeline
          </li>
        </Link>
        {/* <li>About</li> */}
        <Link to={`/users/${id}/friends`}>
          <li className={openTab === 'friends' ? 'selected' : ''}>
              Friends
          </li>
        </Link>
      </ul>
    </div>
  )
};

export default ProfileHeaderNav;
