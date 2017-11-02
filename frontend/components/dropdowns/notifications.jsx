import React from 'react';
import { connect } from 'react-redux';
import { readNotification } from '../../actions/notifications_actions'
import { fetchPost } from '../../actions/posts_actions'
import { parseNotifications } from '../../util/notification_util'
import NotificationListItem from './notification_list_item'
import _ from 'lodash';



class NotificationList extends React.Component {
  constructor(props){
    super(props)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)){
      this.props.close();
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render(){
    const { notifications, readNotification, close } = this.props;
    const notificationList = notifications.map( notification => {
      return (
        <NotificationListItem key={notification.id}
                              notification={notification}
                              readNotification={readNotification}
                              close={close}/>
      )
    })
    return (
      <div className='request-list pos-abs'
           style={ {right:'130px', width: '360px'}}
           ref={ (node) => this.wrapperRef = node}>
        <h3>
          Notifications
        </h3>
        <ul>
          {notificationList}
          {(notificationList.length === 0) &&
            <p> No notifications.</p>}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const notifs = state.entities.notifications
  const notifications = parseNotifications(notifs, state)
  return {
    notifications
  }
}

const mapDispatchToProps = dispatch => ({
  readNotification: notification => dispatch(readNotification(notification)),
  fetchPost: postId => dispatch(fetchPost(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
