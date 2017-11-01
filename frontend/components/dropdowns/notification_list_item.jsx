import React from 'react';
import { Link } from 'react-router-dom';
import { createNotificationText } from '../../util/notification_util'

class NotificationListItem extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const { notification } = this.props;
    const name = notification.author.fullName;
    const text = createNotificationText(notification);

    return(
      <li style={ {color: 'black' }}>
        <h2>{name + text}</h2>
      </li>
    )
  }
}

export default NotificationListItem;
