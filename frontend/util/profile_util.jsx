import React from 'react';

export const friendButton = (props) => {
  const { friendRequestPending, isCurrentUser,
                    areFriends } = props;
  if (isCurrentUser || areFriends ) return null;

  let friendButton;
  if (!friendRequestPending) {
    return (
      <button id="add-friend">
        <i className="fa fa-user" aria-hidden="true"></i>+
        &nbsp; Add Friend
      </button>
    )
  } else if (friendRequestPending){
    return (
      <button id="pending-friend" disabled>
        Pending response...
      </button>
    )
  }
}
