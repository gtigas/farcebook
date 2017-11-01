import React from 'react';
import FriendListItem from './friend_list_item';

class ProfileFriends extends React.Component {


  render(){
    const friendsList = this.props.friends.slice(0,9).map( friend => {
      return (
        <li key={friend.id}><FriendListItem  friend={friend} /></li>
      )
    })
    return (
      <aside id='profile-friends'>
        <h2>
          <i className="fa fa-users" aria-hidden="true"></i>
          &nbsp;&nbsp;Friends
        </h2>
        <p>•</p>&nbsp;
        <i>{this.props.friends.length}</i>
        <ul className='flex-row'>
          {friendsList}
        </ul>
      </aside>
    )
  }
}

export default ProfileFriends;
