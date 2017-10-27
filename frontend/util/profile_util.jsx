import React from 'react';

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
  const timeObj = new Date(time)
  const month = timeObj.toLocaleString('en-us', { month: "long" })
  const date = timeObj.getDay()
  const hours = timeObj.getHours()
  const hh = hours > 12 ? hours - 12 : hours
  const mm = "0" + timeObj.getMinutes()
  const timeOffset = hours >= 12 ? 'PM' : 'AM'

  return month + " " +
          date + " at " +
          hh + ":" +
          mm.slice(-2) + " " +
          timeOffset

}
