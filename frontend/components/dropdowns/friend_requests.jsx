import React from 'react';
import { connect } from 'react-redux';
import { acceptFriendRequest,
          deleteFriendRequest } from '../../actions/friends_actions';
import FriendRequestListItem from './friend_request_list_item'
import _ from 'lodash'

class FriendRequestList extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    const { requests, acceptRequest, denyRequest, close } = this.props
    const requestList = requests.map( request => {
      return (<FriendRequestListItem request={request}
                            acceptRequest={acceptRequest}
                            denyRequest={denyRequest}
                            key={request.id}
                            close={close}/> )
    });
    return(
      <div className="request-list pos-abs" onFocus={this.onBlur}>
        <h3>Friend Requests</h3>
        <ul>
          {requestList}
          {(requestList.length === 0) &&
            <p> No pending friend requests</p>}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  requests: _.values(state.entities.friendRequests.received),
});

const mapDispatchToProps = dispatch => ({
  acceptRequest: userId => dispatch(acceptFriendRequest(userId)),
  denyRequest: userId => dispatch(deleteFriendRequest(userId)),
});

export default connect(mapStateToProps,
                      mapDispatchToProps)(FriendRequestList);
