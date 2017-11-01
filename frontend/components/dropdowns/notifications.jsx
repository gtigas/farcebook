import React from 'react';
import { connect } from 'react-redux';
import { readNotification } from '../../actions/notifications_actions'
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
    const { notifications } = this.props;
    const notificationList = notifications.map( notification => {
      return (
        <NotificationListItem key={notification.id}
                              notification={notification} />
      )
    })
    return (
      <div className='request-list pos-abs'
           style={ {right:'130px'}}
           ref={ (node) => this.wrapperRef = node}>
        <h3>Notifications</h3>
        <ul>
          {notificationList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const notifs = _.values(state.entities.notifications).slice(0,10)
  const notifications = notifs.map( notification => {
    let { notifierId, likeNotification,
          sourceItemId, sourceItemType } = notification
    notification.author = {
      fullName: state.entities.users[notifierId].fullName,
      profilePic: state.entities.users[notifierId].profile_picture_url
    }
    if (sourceItemType === 'Comment' && !likeNotification) {
      notification.item = state.entities.posts[sourceItemId]
    } else if (sourceItemType === 'Comment' && likeNotification) {
      notification.item = state.entities.comments[sourceItemId]
    } else if (sourceItemType === 'Post' && !likeNotification) {
      notification.item = "Wall Post"
    } else if (sourceItemType === 'Post' && likeNotification) {
      notification.item = state.entities.posts[sourceItemId]
    } else if (sourceItemType === 'User') {
      notification.item = "Friend Request"
    }
    return notification
    }
  )


  return {
    notifications
  }
}

const mapDispatchToProps = dispatch => ({
  readNotification: notification => dispatch(readNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
