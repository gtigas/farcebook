import React from 'react';

export const friendButton = (props) => {
  const { friendRequestPending, isCurrentUser,
                    areFriends } = props;
  if (isCurrentUser || areFriends ) return null;

  let friendButton;
  if (!friendRequestPending) {
    return (
      <button id="add-friend"
              onClick={props.addFriend(props.user.id)}>
        <i className="fa fa-user" aria-hidden="true"></i>+
        &nbsp; Add Friend
      </button>
    )
  } else if (friendRequestPending){
    return (
      <button id="pending-friend" disabled>
        Friend Request Sent
      </button>
    )
  }
}
