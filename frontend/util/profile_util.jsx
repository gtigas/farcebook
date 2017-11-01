import React from 'react';
import moment from 'moment';
export class FriendButton extends React.Component {
  constructor(props){
    super(props)
    this.state = { dropdown: false }
    this._onClick = this._onClick.bind(this);
    this._removeFriend = this._removeFriend.bind(this);
  }

  _onClick(e){
    e.preventDefault();
    setTimeout( () => {
      this.setState( { dropdown: !this.state.dropdown } )
    }, 100)
  }


  _removeFriend(){
    this.props.removeFriend(this.props.user.id)();
  }

  render() {
    const { friendRequestPending, isCurrentUser,
            areFriends, removeFriend, user, addFriend, currentUserId} = this.props;
    if (isCurrentUser || !user.friend_ids) return null;


    if (user.friend_ids.includes(currentUserId)) {
      return (
        <div>
          <button id="already-friends" onFocus={this._onClick}
                                        onBlur={this._onClick}>
            Friends
            &nbsp; <i className="fa fa-check" aria-hidden="true"></i>
          </button>
          {this.state.dropdown && <button id='remove-friend'
                                          onClick={this._removeFriend}>
                                  Remove Friend</button>}
        </div>

      )
    } else if (!friendRequestPending) {
      return (
        <button id="add-friend"
                onClick={addFriend(user.id)}>
          <i className="fa fa-user" aria-hidden="true"></i>+
          &nbsp; Add Friend
        </button>
      )
    } else if (friendRequestPending){
      return (
        <button id="pending-friend" disabled>
          Friend Request Pending
        </button>
      )
    }
  }
}

export const requestPending = (state, user) => {
  const hasSentRequest = state.entities.friendRequests.sent.includes(parseInt(user));
  const hasReceivedRequest = _.values(state.entities.friendRequests.received)
                                  .some( request => {
                                    return request.requester_id === (parseInt(user))
                                  });
  return (hasSentRequest || hasReceivedRequest)
}

export const convertTime = (time) => {
  const postTime = moment(time);
  const now = moment();
  const yesterday = moment().subtract(24,'hours');
  const startOfYesterday = moment().subtract(24,'hours').startOf('day');
  if (postTime.isAfter(yesterday)) {
    return postTime.fromNow();
  } else if (postTime.isAfter(startOfYesterday)) {
    return postTime.format('[Yesterday] [at] h:mma' );
  } else {
    return postTime.format('MMMM D [at] h:mma');
  }
}
