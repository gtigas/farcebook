import React from 'react';
import { Link } from 'react-router-dom'

const ProfileHeaderNav = ({id, openTab}) => (
  <div id='profile-header-nav'>
    <ul>
      <li>
        <Link to={`/users/${id}`} onClick={openTab('timeline')}>
          Timeline
        </Link>
      </li>
      {/* <li>About</li> */}
      <li>
        <Link to={`/users/${id}/friends`} onClick={openTab('friends')}>
          Friends
        </Link>
      </li>
    </ul>
  </div>
);

export default ProfileHeaderNav;
