import React from 'react';
import { Link } from 'react-router-dom';
import { createNotificationText, notificationItemLink } from '../../util/notification_util'
import { convertTime } from '../../util/profile_util';

class NotificationListItem extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillUnmount(){
    const { notification, readNotification } = this.props
    if (notification.unread) {
      readNotification(notification);
    }
  }

  render() {
    const { notification, close } = this.props;
    const name = notification.author.fullName;
    const text = createNotificationText(notification);
    const url = notificationItemLink(notification);

    return(
      <Link to={url} id='notif-link' onClick={close}>
        <li
          style={ {color: 'black' }}
          className={notification.unread ? 'unread' : 'notification-item'}
          >
          <img src={notification.author.profilePic}
            height="50px"
            width="50px"
            className='circle-thumb'/>
          <div className='flex-col'>
            <h2>
              <strong>{name}</strong>
              {text}
            </h2>
            <i>
              {convertTime(notification.created_at)}
            </i>
          </div>
        </li>
      </Link>

    )
  }
}

export default NotificationListItem;
