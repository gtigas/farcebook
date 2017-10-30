import React from 'react';
import { Link } from 'react-router-dom'

const FriendsPageItem = ({friend}) => {
  return (
    <div className='flex-row'>
      <img src={friend.profile_picture_url} ></img>
      <Link to={`/users/${friend.id}`}><h3>{friend.fullName}</h3></Link>
    </div>
  )
}

export default FriendsPageItem;
