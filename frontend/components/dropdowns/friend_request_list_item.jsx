import React from 'react';
import { Link } from 'react-router-dom';

class FriendRequestListItem extends React.Component {
  constructor(props){
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(button, userId){
    const { acceptRequest, denyRequest } = this.props;
    const action = button === 'confirm' ? acceptRequest : denyRequest;
    return (e) => {
      e.preventDefault();
      action(userId);
    }
  }

  render(){
    const { request, close } = this.props;
    return(
      <li className='flex-row request-item'>
        <span className='flex-row'>
          <Link to={`/users/${request.requester_id}`} onClick={close}>
          <img src={request.profile_picture_url}
              height="50px"
              width="50px"
              className='circle-thumb'/>
            <i>{request.requester_name}</i>
          </Link>
        </span>
        <span>
          <button
            onClick={this._handleClick('confirm', request.requester_id)}>
            Confirm
          </button>
          <button
            onClick={this._handleClick('deny', request.requester_id)}>
            Delete Request
          </button>
        </span>

      </li>
    )
  }
}

export default FriendRequestListItem;
