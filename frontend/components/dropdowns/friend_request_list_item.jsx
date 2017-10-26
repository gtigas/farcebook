import React from 'react';
import { Link } from 'react-router-dom';

class FriendRequestListItem extends React.Component {
  constructor(props){
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(button){
    const { acceptRequest, denyRequest } = this.props;
    const action = button === 'confirm' ? acceptRequest : denyRequest;
    return (e) => {
      e.preventDefault();
      action();
    }
  }

  render(){
    const { request } = this.props;
    return(
      <li className='flex-row request-item'>
        <span>
          <Link to={`/users/${request.requester_id}`}
          onClick={this.props.close}>
          <img src={request.profile_picture_url}
            height="50px"
            width="50px"
          className='circle-thumb'/>
            {request.requester_name}
          </Link>
        </span>
        <span>
          <button onClick={this._handleClick('confirm')} >Confirm</button>
          <button onClick={this._handleClick('deny')}>Delete Request</button>
        </span>

      </li>
    )
  }
}

export default FriendRequestListItem;
