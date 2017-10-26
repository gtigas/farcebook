import React from 'react';
import { Link } from 'react-router-dom'

const FriendListItem = ({friend}) => {
  return (
    <Link to={`/users/${friend.id}`}>
      <div className='pos-rel'>
        <img src={friend.profile_picture_url} ></img>
        <h3 className='pos-abs'>{friend.fullName}</h3>
      </div>
    </Link>
  )
};

export default FriendListItem;
