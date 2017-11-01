import React from 'react';
import { connect } from 'react-redux';
import FriendsPageItem from './friends_page_item'

const FriendsPage = ({friends}) => {
  const friendsList = friends.map( friend => {
    return (
      <FriendsPageItem key={friend.id} friend={friend}/>
    )
  })
  return (
    <div className="friends-page">
      <h2>
        <i className="fa fa-users" aria-hidden="true" />
        Friends
      </h2>
      <div>
        <ul className="friends-page-list">
          {friendsList}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId]
  const friends = user.friend_ids.map( id => state.entities.users[id])
  return {
    friends
  }
}

export default connect(mapStateToProps)(FriendsPage);
