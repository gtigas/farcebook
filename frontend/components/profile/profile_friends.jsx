import React from 'react';
import FriendListItem from './friend_list_item';

class ProfileFriends extends React.Component {


  render(){
    const friendsList = this.props.friends.map( friend => {
      return (
        <li><FriendListItem key={friend.id} friend={friend} /></li>
      )
    })
    return (
      <aside id='profile-friends'>
        <h2><i className="fa fa-users" aria-hidden="true"></i>
        &nbsp;&nbsp;Friends</h2>
        <ul className='flex-row'>
          {friendsList}
        </ul>
      </aside>
    )
  }
}

export default ProfileFriends;
