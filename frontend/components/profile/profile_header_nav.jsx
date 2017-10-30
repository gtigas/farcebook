import React from 'react';
import { Link } from 'react-router-dom'

const ProfileHeaderNav = ({id}) => (
  <div id='profile-header-nav'>
    <ul>
      <li><Link to={`/users/${id}`}>Timeline</Link></li>
      <li>About</li>
      <li><Link to={`/users/${id}/friends`}>Friends</Link></li>
    </ul>
  </div>
);

export default ProfileHeaderNav;
