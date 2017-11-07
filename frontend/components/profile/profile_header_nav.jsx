import React from 'react';
import { Link } from 'react-router-dom'


const ProfileHeaderNav = ({ id, openTab }) => {
  return (
    <div id='profile-header-nav'>
      <ul className='pos-rel'>
        <li className={openTab === 'timeline' ? 'selected' : ''}>
          <Link to={`/users/${id}`}>
            Timeline
          </Link>
        </li>
        {/* <li>About</li> */}
        <li className={openTab === 'friends' ? 'selected' : ''}>
          <Link to={`/users/${id}/friends`}>
            Friends
          </Link>
        </li>
      </ul>
    </div>
  )
};

export default ProfileHeaderNav;
